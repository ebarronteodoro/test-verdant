import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST (request) {
  try {
    const body = await request.json()
    const { referente, referido } = body

    if (!referente || !referido) {
      return NextResponse.json(
        { success: false, error: 'Faltan datos del formulario.' },
        { status: 400 }
      )
    }

    // Insertar datos del referente en la tabla "referrer"
    const newReferrer = await prisma.referrer.create({
      data: {
        name: referente.Nombres,
        lastname: referente.Apellidos,
        id_building: referente.IdProyecto, // Se asume que este valor corresponde al ID del building (proyecto)
        id_document_type: referente.IdTipoDocumento,
        num_document: referente.NroDocumento,
        email: referente.Correo,
        phone: referente.Celular
      }
    })

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
        phone: referido.Celular
      }
    })

    return NextResponse.json({
      success: true,
      referrer: newReferrer,
      referred: newReferred
    })
  } catch (error) {
    console.error('Error guardando el formulario:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
