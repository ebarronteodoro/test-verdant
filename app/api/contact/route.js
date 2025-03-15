// app/api/contact/route.js
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST (req) {
  try {
    const body = await req.json()
    // Extraemos los datos enviados desde el formulario.
    // Asegúrate de que los nombres coincidan con los que envías desde el front-end.
    const {
      Nombres,
      Apellidos,
      IdProyecto,
      IdTipoDocumento,
      NroDocumento,
      Correo,
      Celular,
      Comentario
    } = body

    // Validación básica: verifica que todos los campos requeridos existan
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
          error: 'Uno o más campos son inválidos o están vacíos.'
        },
        { status: 400 }
      )
    }

    // Verifica si el proyecto (building) existe
    const building = await prisma.building.findUnique({
      where: { id: Number(IdProyecto) }
    })

    if (!building) {
      return NextResponse.json(
        { success: false, error: 'El proyecto no existe.' },
        { status: 400 }
      )
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
        message: Comentario
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Formulario enviado correctamente.'
    })
  } catch (error) {
    console.error('Error en API contact:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
