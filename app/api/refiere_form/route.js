// app/api/refiere_form/route.js
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST (request) {
  try {
    const body = await request.json()
    // Esperamos que el body contenga al menos: evolta, referente y referido.
    if (!body || !body.referente || !body.referido || !body.evolta) {
      return NextResponse.json(
        { success: false, error: 'Faltan datos del formulario.' },
        { status: 400 }
      )
    }
    const { evolta, referente, referido } = body

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

    // Antes de enviar a Evolta, se agregan los parámetros usuario y clave extraídos del .env
    evolta.usuario = process.env.EVOLTA_LEAD_USER
    evolta.clave = process.env.EVOLTA_LEAD_PASSWORD

    // Enviar datos a Evolta
    const evoltaResponse = await fetch('https://webapi.evolta.pe/lead/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(evolta)
    })
    let evoltaResult = {}
    try {
      evoltaResult = await evoltaResponse.json()
    } catch (error) {
      console.warn('Respuesta de Evolta sin contenido JSON:', error)
      evoltaResult = {}
    }
    if (!evoltaResponse.ok) {
      return NextResponse.json(
        { success: false, error: 'Error al enviar datos a Evolta.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      referrer: newReferrer,
      referred: newReferred,
      evolta: evoltaResult
    })
  } catch (error) {
    console.error('Error guardando el formulario:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
