// app/api/contact_form/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();

    // Validar que se envíen los campos requeridos (usando la estructura de tu formulario)
    if (
      !body.Nombres ||
      !body.Apellidos ||
      !body.IdProyecto ||
      !body.Correo ||
      !body.Celular
    ) {
      return NextResponse.json(
        { success: false, error: "Faltan datos del formulario." },
        { status: 400 }
      );
    }

    // Guardar en la tabla lead_contact (asegúrate de que los campos concuerden con tu modelo en Prisma)
    const newContact = await prisma.lead_contact.create({
      data: {
        name: body.Nombres,
        lastname: body.Apellidos,
        id_building: Number(body.IdProyecto),
        id_document_type: body.IdTipoDocumento
          ? Number(body.IdTipoDocumento)
          : 1, // Por defecto DNI = 1
        num_document: body.NroDocumento || "",
        email: body.Correo,
        phone: body.Celular,
        message: body.Comentario || "",
      },
    });

    // Preparar el payload para Evolta usando la misma estructura y agregando usuario y clave
    const evoltaPayload = {
      IdTipoPortal: body.IdTipoPortal || 10,
      IdProyecto: Number(body.IdProyecto),
      IdTipoDocumento: body.IdTipoDocumento ? Number(body.IdTipoDocumento) : 1,
      NroDocumento: body.NroDocumento || "",
      Nombres: body.Nombres,
      Apellidos: body.Apellidos,
      Correo: body.Correo,
      Celular: body.Celular,
      Comentario: body.Comentario || "",
      usuario: process.env.EVOLTA_LEAD_USER,
      clave: process.env.EVOLTA_LEAD_PASSWORD,
    };

    const evoltaResponse = await fetch("https://webapi.evolta.pe/lead/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(evoltaPayload),
    });

    let evoltaResult = {};
    try {
      evoltaResult = await evoltaResponse.json();
    } catch (error) {
      console.warn("Error al parsear respuesta de Evolta:", error);
      evoltaResult = { raw: await evoltaResponse.text() };
    }
    if (!evoltaResponse.ok) {
      return NextResponse.json(
        { success: false, error: "Error al enviar datos a Evolta." },
        { status: 500 }
      );
    }

    // Preparar el payload para Elastic Email
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
Se ha recibido un nuevo formulario con los siguientes datos:
Nombres: ${body.Nombres}
Apellidos: ${body.Apellidos}
Correo: ${body.Correo}
Teléfono: ${body.Celular}
Comentario: ${body.Comentario || ""}
            `,
          },
        ],
        Subject: "Nuevo formulario recibido",
        From: process.env.SMTP_FROM_EMAIL,
        FromName: "Formulario Contacto",
      },
      MessageStream: "outbound", // Asegúrate de que este valor sea correcto según tu configuración
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

    // Verificar la respuesta del envío del correo
    if (!emailResponse.ok) {
      let errorData;
      const responseText = await emailResponse.text();
      try {
        errorData = JSON.parse(responseText);
      } catch (jsonError) {
        errorData = responseText;
      }
      console.error("Error al enviar email:", errorData);
      return NextResponse.json(
        { success: false, error: "Error al enviar el correo electrónico." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Formulario enviado correctamente.",
      contact: newContact,
      evolta: evoltaResult,
    });
  } catch (error) {
    console.error("Error en /api/contact_form:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
