import Head from 'next/head'
import Layout from '../components/Layout'
import slugify from 'slugify'
import '@/styles/proyectos.css' // ✅ Importamos su CSS propio

export async function getServerSideProps (context) {
  const { slug } = context.params

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

  const proyecto = proyectos.find(
    item => slugify(item.nombre, { lower: true, strict: true }) === slug
  )

  if (!proyecto) {
    return { notFound: true }
  }

  return {
    props: { proyecto }
  }
}

export default function ProyectoDetalle ({ proyecto }) {
  return (
    <Layout>
      <Head>
        <title>{`${proyecto.nombre} | Verdant`}</title>
        <meta name='description' content={proyecto.descripcion} />
      </Head>

      <div className='proyecto-container'>
        <h2>{proyecto.nombre}</h2>
        <p>{proyecto.descripcion}</p>
      </div>
    </Layout>
  )
}
