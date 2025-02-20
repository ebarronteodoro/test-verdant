import Link from 'next/link'
import Head from 'next/head'
import slugify from 'slugify'
import './styles/home.css' // ✅ Importamos su CSS propio
import Layout from './Layouts/layout'

export const metadata = {
  title: 'Verdant Inmobiliaria',
  description:
    'Descubre los mejores proyectos inmobiliarios con Verdant. Encuentra tu nuevo hogar con las mejores ubicaciones y diseños modernos.',
  keywords: 'proyectos inmobiliarios, departamentos, Verdant'
}

async function getProyectos () {
  const proyectos = [
    {
      id: 1,
      nombre: 'Residencial Verde',
      descripcion: 'Un paraíso ecológico en la ciudad'
    },
    {
      id: 2,
      nombre: 'Sky Tower',
      descripcion: 'Exclusivos departamentos con vista al mar'
    },
    {
      id: 3,
      nombre: 'Urban Park',
      descripcion: 'Conectividad y naturaleza en un solo lugar'
    }
  ]

  // Generamos el slug en el servidor
  return proyectos.map(proyecto => ({
    ...proyecto,
    slug: slugify(proyecto.nombre, { lower: true, strict: true })
  }))
}

export default async function Home () {
  const proyectos = await getProyectos()

  return (
    <Layout>
      <h1>Bienvenidos a Verdant</h1>
      <p>Descubre nuestros proyectos inmobiliarios.</p>

      {/* {proyectos.length > 0 ? (
        <ul>
          {proyectos.map(proyecto => (
            <li key={proyecto.id}>
              <Link href={`/proyectos/${proyecto.slug}`}>
                {proyecto.nombre}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay proyectos disponibles en este momento.</p>
      )} */}
    </Layout>
  )
}
