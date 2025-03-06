import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const projects = {
  seed: 1646,
  soil: 1647
}

async function checkAuth (req) {
  if (process.env.NODE_ENV === 'production') {
    const apiKey = req.headers.get('x-api-key')
    if (apiKey !== process.env.API_KEY) {
      return Response.json({ error: 'Acceso no autorizado' }, { status: 401 })
    }
  }
  return null
}

export async function GET (req) {
  const authError = await checkAuth(req)
  if (authError) return authError

  const { searchParams } = new URL(req.url)
  const projectKey = searchParams.get('project')

  if (!projectKey || !projects[projectKey]) {
    return Response.json(
      { error: 'Proyecto inválido o no especificado' },
      { status: 400 }
    )
  }

  const projectId = projects[projectKey]

  try {
    // Obtener todas las tipologías del proyecto
    const typologies = await prisma.typologies.findMany({
      where: { project_id: projectId },
      select: {
        id: true,
        typology_name: true,
        bedroom_count: true,
        image_url: true
      }
    })

    if (!typologies.length) {
      return Response.json(
        { message: 'No hay tipologías disponibles' },
        { status: 404 }
      )
    }

    // Obtener características de todas las tipologías en una sola consulta
    const typologyFeatures = await prisma.typology_features.findMany({
      where: {
        typology_id: { in: typologies.map(t => t.id) }
      },
      select: {
        typology_id: true,
        description: true,
        bathrooms: true,
        has_living_room: true,
        has_kitchen: true,
        has_laundry: true,
        has_balcony: true
      }
    })

    // Organizar los datos en un formato estructurado
    const response = typologies.map(typology => ({
      typology_id: typology.id,
      typology_name: typology.typology_name,
      bedroom_count: typology.bedroom_count,
      image_url: typology.image_url,
      features: typologyFeatures
        .filter(f => f.typology_id === typology.id)
        .map(f => ({
          description: f.description || 'Sin descripción',
          bathrooms: f.bathrooms || 0,
          has_living_room: f.has_living_room || false,
          has_kitchen: f.has_kitchen || false,
          has_laundry: f.has_laundry || false,
          has_balcony: f.has_balcony || false
        }))
    }))

    return Response.json(response)
  } catch (error) {
    console.error('Error en Prisma:', error)
    return Response.json(
      { error: 'Error al obtener tipologías y características' },
      { status: 500 }
    )
  }
}
