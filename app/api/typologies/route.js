import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const projects = {
  seed: 1646,
  soil: 1647
}

// Middleware para autenticar el acceso en producción
async function checkAuth(req) {
  if (process.env.NODE_ENV === 'production') {
    const apiKey = req.headers.get('x-api-key')
    if (apiKey !== process.env.API_KEY) {
      return Response.json({ error: 'Acceso no autorizado' }, { status: 401 })
    }
  }
  return null
}

export async function GET(req) {
  const authError = await checkAuth(req)
  if (authError) return authError

  const { searchParams } = new URL(req.url)
  const projectKey = searchParams.get('project')
  const bedrooms = searchParams.get('bedrooms') ? parseInt(searchParams.get('bedrooms'), 10) : null

  if (!projectKey || !projects[projectKey]) {
    return Response.json({ error: 'Proyecto inválido o no especificado' }, { status: 400 })
  }

  const projectId = projects[projectKey]

  try {
    const typologies = await prisma.typologies.findMany({
      where: {
        project_id: projectId,
        ...(bedrooms !== null && { bedroom_count: bedrooms })
      },
      orderBy: [
        {
          typology_name: 'asc'
        }
      ],
      select: {
        id: true,
        typology_name: true,
        bedroom_count: true,
        image_url: true
      }
    })

    return Response.json(typologies)
  } catch (error) {
    console.error('Error en Prisma:', error)
    return Response.json({ error: 'Error al obtener tipologías' }, { status: 500 })
  }
}
