import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      Nombres,
      Apellidos,
      IdProyecto,
      IdTipoDocumento,
      NroDocumento,
      Correo,
      Celular,
      Comentario,
    } = body;

    // Validación básica
    if (
      !Nombres ||
      !Apellidos ||
      !IdProyecto ||
      !IdTipoDocumento ||
      !NroDocumento ||
      !Correo ||
      !Celular ||
      !Comentario
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Uno o más campos son inválidos o están vacíos.",
        },
        { status: 400 }
      );
    }

    // Verifica si el proyecto existe
    const building = await prisma.building.findUnique({
      where: { id: Number(IdProyecto) },
    });

    if (!building) {
      return NextResponse.json(
        { success: false, error: "El proyecto no existe." },
        { status: 400 }
      );
    }

    // Inserta la información en la tabla lead_general
    const submission = await prisma.lead_general.create({
      data: {
        name: Nombres,
        lastname: Apellidos,
        id_building: Number(IdProyecto),
        id_document_type: Number(IdTipoDocumento),
        num_document: NroDocumento,
        email: Correo,
        phone: Celular,
        message: Comentario,
      },
    });

    // Preparamos el payload para Elastic Email
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
Nombres: ${Nombres}
Apellidos: ${Apellidos}
Correo: ${Correo}
Teléfono: ${Celular}
Comentario: ${Comentario}
            `,
          },
        ],
        Subject: "Nuevo formulario recibido",
        From: process.env.SMTP_FROM_EMAIL,
        FromName: "Formulario Contacto",
      },
      MessageStream: "outbound", // Verifica que este valor sea el correcto en tu cuenta
    };

    // Envía el correo usando la API de Elastic Email (v4)
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

    // Verifica la respuesta del envío del email
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
      message: "Formulario enviado correctamente.",
    });
  } catch (error) {
    console.error("Error en API contact:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
