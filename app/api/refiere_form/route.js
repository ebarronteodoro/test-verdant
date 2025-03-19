// app/api/refiere_form/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    // Esperamos que el body contenga al menos: evolta, referente y referido.
    if (!body || !body.referente || !body.referido || !body.evolta) {
      return NextResponse.json(
        { success: false, error: "Faltan datos del formulario." },
        { status: 400 }
      );
    }
    const { evolta, referente, referido } = body;

    // Insertar datos del referente en la tabla "referrer"
    const newReferrer = await prisma.referrer.create({
      data: {
        name: referente.Nombres,
        lastname: referente.Apellidos,
        id_building: referente.IdProyecto, // Se asume que este valor corresponde al ID del building (proyecto)
        id_document_type: referente.IdTipoDocumento,
        num_document: referente.NroDocumento,
        email: referente.Correo,
        phone: referente.Celular,
      },
    });

    // Insertar datos del referido en la tabla "referred" vinculando al referrer
    const newReferred = await prisma.referred.create({
      data: {
        id_referrer: newReferrer.id,
        name: referido.Nombres,
        lastname: referido.Apellidos,
        id_building: referido.IdProyecto,
        id_document_type: referido.IdTipoDocumento,
        num_document: referido.NroDocumento,
        email: referido.Correo,
        phone: referido.Celular,
      },
    });

    // Antes de enviar a Evolta, se agregan los parámetros usuario y clave extraídos del .env
    evolta.usuario = process.env.EVOLTA_LEAD_USER;
    evolta.clave = process.env.EVOLTA_LEAD_PASSWORD;

    // Enviar datos a Evolta
    const evoltaResponse = await fetch("https://webapi.evolta.pe/lead/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(evolta),
    });
    let evoltaResult = {};
    try {
      evoltaResult = await evoltaResponse.json();
    } catch (error) {
      console.warn("Respuesta de Evolta sin contenido JSON:", error);
      evoltaResult = {};
    }
    if (!evoltaResponse.ok) {
      return NextResponse.json(
        { success: false, error: "Error al enviar datos a Evolta." },
        { status: 500 }
      );
    }

    // Preparar el payload para enviar el correo con Elastic Email
    const emailPayload = {
      Recipients: [
        {
          Email: process.env.SMTP_DESTINATION_EMAIL,
        },
      ],
      Content: {
        Body: [
          {
            ContentType: "PlainText",
            Content: `
Se ha recibido un nuevo formulario de referido:

Referente:
  Nombres: ${referente.Nombres}
  Apellidos: ${referente.Apellidos}
  Correo: ${referente.Correo}
  Teléfono: ${referente.Celular}

Referido:
  Nombres: ${referido.Nombres}
  Apellidos: ${referido.Apellidos}
  Correo: ${referido.Correo}
  Teléfono: ${referido.Celular}
            `,
          },
        ],
        Subject: "Nuevo formulario de referido recibido",
        From: process.env.SMTP_FROM_EMAIL,
        FromName: "Formulario Refieres",
      },
      MessageStream: "outbound", // Verifica que este valor sea el correcto en tu cuenta
    };

    // Enviar el correo usando la API de Elastic Email (v4)
    const emailResponse = await fetch(
      "https://api.elasticemail.com/v4/emails",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-ElasticEmail-ApiKey": process.env.ELASTICEMAIL_API_KEY,
        },
        body: JSON.stringify(emailPayload),
      }
    );

    // Verifica la respuesta del envío del correo
    if (!emailResponse.ok) {
      let errorData;
      const responseText = await emailResponse.text();
      if (responseText) {
        try {
          errorData = JSON.parse(responseText);
        } catch (jsonError) {
          errorData = responseText;
        }
      } else {
        errorData = "No se devolvió contenido en la respuesta.";
      }
      console.error("Error al enviar email:", errorData);
      return NextResponse.json(
        {
          success: false,
          error: "Error al enviar el correo electrónico.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      referrer: newReferrer,
      referred: newReferred,
      evolta: evoltaResult,
    });
  } catch (error) {
    console.error("Error guardando el formulario:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
