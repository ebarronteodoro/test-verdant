import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();

    // Verificar que se reciba la estructura esperada: db, evolta y mailer
    if (!body || !body.db || !body.evolta || !body.mailer) {
      return NextResponse.json(
        { success: false, error: "Estructura JSON inválida." },
        { status: 400 }
      );
    }
    const { db, evolta, mailer } = body;

    // Extraer datos de "db"
    const {
      typology,
      Nombres,
      Apellidos,
      IdProyecto,
      IdTipoDocumento,
      NroDocumento,
      Correo,
      Celular,
      Comentario,
    } = db;

    if (
      !typology ||
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
        { success: false, error: "Faltan campos requeridos." },
        { status: 400 }
      );
    }

    // Verificar que el proyecto (building) exista
    const building = await prisma.building.findUnique({
      where: { id: Number(IdProyecto) },
    });
    if (!building) {
      return NextResponse.json(
        { success: false, error: "El proyecto no existe." },
        { status: 400 }
      );
    }

    // Insertar datos en la tabla lead_typologie
    const newLead = await prisma.lead_typologie.create({
      data: {
        id_typologie: Number(typology),
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

    // Antes de enviar a Evolta, se agregan los parámetros usuario y clave
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

    // Preparar el cuerpo del correo (HTML)
    const emailBody = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Notificación de Registro</title>
        <style>
          body { font-family: Arial, sans-serif; }
          .info { margin-bottom: 8px; }
          .info strong { display: inline-block; width: 150px; }
        </style>
      </head>
      <body>
        <h1>Nuevo Registro</h1>
        <div class="info"><strong>Tipología:</strong> ${mailer.typology}</div>
        <div class="info"><strong>Nombres:</strong> ${mailer.first_name}</div>
        <div class="info"><strong>Apellidos:</strong> ${mailer.last_name}</div>
        <div class="info"><strong>Teléfono:</strong> ${
          mailer.phone || "No proporcionado"
        }</div>
        <div class="info"><strong>Correo:</strong> ${mailer.email}</div>
        <div class="info"><strong>Tipo de Documento:</strong> ${
          mailer.document_type
        }</div>
        <div class="info"><strong>Número de Documento:</strong> ${
          mailer.dni
        }</div>
        <div class="info"><strong>Mensaje:</strong> ${mailer.message}</div>
        <div class="info"><strong>Aceptó Términos:</strong> ${
          mailer.termsAccepted ? "Sí" : "No"
        }</div>
        <div class="info"><strong>ID Proyecto:</strong> ${
          mailer.projectId
        }</div>
      </body>
      </html>
    `;

    // Configurar el payload para ElasticEmail
    const emailPayload = {
      Recipients: [{ Email: process.env.SMTP_DESTINATION_EMAIL }],
      Content: {
        From: process.env.SMTP_FROM_EMAIL,
        FromName: process.env.SMTP_FROM_NAME,
        Subject: "Nuevo registro en el formulario",
        Body: [
          {
            ContentType: "HTML",
            Content: emailBody,
          },
        ],
      },
      MessageStream: "outbound", // Asegúrate de que este valor es el correcto para tu cuenta
    };

    // Utilizar el endpoint de ElasticEmail con la API key en la cabecera
    const elasticUrl = "https://api.elasticemail.com/v4/emails";

    const emailResponse = await fetch(elasticUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-ElasticEmail-ApiKey": process.env.ELASTICEMAIL_API_KEY,
      },
      body: JSON.stringify(emailPayload),
    });

    let emailResult = {};
    const rawEmailText = await emailResponse.text();
    // console.log(emailResponse);
    try {
      emailResult = JSON.parse(rawEmailText);
    } catch (error) {
      console.warn("Error al parsear el JSON de ElasticEmail:", error);
      emailResult = { raw: rawEmailText };
    }
    if (!emailResponse.ok) {
      return NextResponse.json(
        { success: false, error: "Error al enviar correo a ElasticEmail." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Formulario enviado correctamente.",
      db: newLead,
      evolta: evoltaResult,
      email: emailResult,
    });
  } catch (error) {
    console.error("Error en /api/submit-typology:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
