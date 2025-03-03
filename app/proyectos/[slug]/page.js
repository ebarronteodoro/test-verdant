import Layout from '@/app/Layouts/layout'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import '@/app/styles/details.css'
import slugify from 'slugify'
import { getImages } from '@/app/lib/getImages'
import DetailsGroup from '@/app/components/groups/DetailsGroup'

const projects = [
  {
    id: 'soil',
    name: 'SOIL',
    title: 'Soil Pueblo Libre',
    location: 'PUEBLO LIBRE',
    address: 'Av. La Marina 426',
    status: 'Departamentos en construcción',
    imgSrc: '/buildings/soil-project.png',
    minSize: '35',
    maxSize: '77',
    rooms: '1-2-3',
    price: 'S/ 277,780',
    distrito_alterno: 'Surco',
    logo: '/details/logo-soil.png',
    directorio: 'SOIL',
    promo: 'Vive cerca a Jesús María y Magdalena',
    ubicacion: 'Av. La Marina 406 - 425, ',
    distrito: 'Pueblo Libre',
    sala_ventas: 'Av. La Marina 406 - 425, Pueblo Libre',
    horario: 'Lunes a domingo: 10 am - 7 pm.',
    gmaps_link:
      'https://www.google.com/maps/place/Proyecto+Soil/@-12.0838136,-77.0683315,17z',
    waze_link:
      'https://www.waze.com/es/live-map/directions/pe/provincia-de-lima/lima/proyecto-soil?navigate=yes',
    iframe: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.413586879796!2d-77.06833149044587!3d-12.083813588106487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c9b1b854b5bd%3A0xf0932df9d532bc99!2sProyecto%20Soil!5e0!3m2!1ses-419!2spe!4v1734528124733!5m2!1ses-419!2spe" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`
  },
  {
    id: 'seed',
    name: 'SEED',
    title: 'Seed Growing Home',
    location: 'SURCO',
    address: 'Jr. República de Líbano 173',
    status: 'Últimas unidades ¡Múdate ya!',
    imgSrc: '/buildings/seed-project.png',
    minSize: '52',
    maxSize: '146',
    rooms: '2-4',
    price: 'S/ 467,780',
    distrito_alterno: 'Pueblo Libre',
    logo: '/details/logo-seed.png',
    directorio: 'SEED',
    promo: 'Solo 10 depas disponibles',
    ubicacion: 'Jr. República del Líbano 179 - 141, ',
    distrito: 'Surco',
    sala_ventas: 'Jr. República del Líbano 179 - 141, Surco',
    horario: 'Lunes a domingo: 10 am - 7 pm.',
    gmaps_link:
      'https://www.google.com/maps/place/Proyecto+Seed/@-12.0830611,-76.9789944,17z',
    waze_link:
      'https://www.waze.com/es/live-map/directions/pe/provincia-de-lima/lima/proyecto-seed?navigate=yes',
    iframe: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.4245562252313!2d-76.98157469044588!3d-12.083061088107181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c7ff830c6de5%3A0x8985a33e1f3ba0ee!2sProyecto%20Seed!5e0!3m2!1ses-419!2spe!4v1734528913352!5m2!1ses-419!2spe" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`
  }
]

export async function generateStaticParams () {
  return projects.map(project => ({
    slug: `departamentos-en-venta-${slugify(project.location, {
      lower: true,
      strict: true
    })}-${slugify(project.name, { lower: true, strict: true })}`
  }))
}

export async function generateMetadata ({ params }) {
  const { slug } = await params
  const slugParts = slug.split('-')
  if (slugParts.length < 5) return notFound() // Validar formato del slug

  const projectLocation = slugParts.slice(3, -1).join('-') // Extrae `location`
  const projectName = slugParts.slice(-1)[0] // Extrae `name`

  const project = projects.find(
    p =>
      slugify(p.name, { lower: true, strict: true }) === projectName &&
      slugify(p.location, { lower: true, strict: true }) === projectLocation
  )

  if (!project) return notFound()

  return {
    title: `${
      project.name.charAt(0).toUpperCase() + project.name.slice(1).toLowerCase()
    } | Departamentos en Venta en ${
      project.location.charAt(0).toUpperCase() +
      project.location.slice(1).toLowerCase()
    }`,
    description: `Encuentra tu departamento ideal en ${project.location}. ${project.title} te ofrece departamentos desde ${project.price}. ¡Conoce más aquí!`
  }
}

export default async function ProjectPage ({ params }) {
  const { slug } = await params

  const slugParts = slug.split('-')
  const projectName = slugParts.slice(-1)[0]

  const project = projects.find(
    p => slugify(p.name, { lower: true, strict: true }) === projectName
  )

  if (!project) return notFound()

  const images = getImages(project.id)

  return (
    <Layout>
      <section className='intro-section'>
        <picture>
          {project.id === 'soil' ? (
            <Image
              width={1250}
              priority
              height={240}
              src='/SOIL/Terraza.jpg'
              alt='Terraza de Soil'
            />
          ) : project.id === 'seed' ? (
            <Image
              width={1250}
              priority
              height={240}
              src='/banner-seed.jpg'
              alt='Banner de Seed'
            />
          ) : null}
        </picture>

        {project.id === 'seed' ? (
          <h3>
            7700m<sup>2</sup> área verde <span>solo para ti</span>
          </h3>
        ) : project.id === 'soil' ? (
          <h3>
            <span>Disfruta de</span> +10 áreas sociales
          </h3>
        ) : null}
      </section>
      <DetailsGroup project={project} images={images} />
    </Layout>
  )
}
