import Layout from '@/app/Layouts/layout'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import '../../styles/details.css'
import slugify from 'slugify'

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
    directorio: '/assets/img/SOIL/',
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
    directorio: '/assets/img/SEED/',
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

export default async function ProjectPage ({ params }) {
  const { slug } = await params

  const slugParts = slug.split('-')
  const projectName = slugParts.slice(-1)[0]

  const project = projects.find(
    p => slugify(p.name, { lower: true, strict: true }) === projectName
  )

  if (!project) return notFound()

  if (!project) return notFound()

  return (
    <Layout>
      <section className='intro-section'>
        <picture>
          {project.id === 'soil' ? (
            <Image width={1250} priority height={240} src='/SOIL/Terraza.jpg' alt='Terraza de Soil' />
          ) : project.id === 'seed' ? (
            <Image width={1250} priority height={240} src='/banner-seed.jpg' alt='Banner de Seed' />
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

      <section className='info-section'>
        <div className='info-container'>
          <span className='promo'>{project.promo}</span>

          <div className='logo'>
            <picture>
              <Image width={300} height={100} priority src={project.logo} alt={`Logo de ${project.title}`} />
            </picture>
          </div>

          <div className='info'>
            <div className='rows'>
              <div className='status'>
                <h3>{project.status}</h3>
              </div>

              <div className='location'>
                <p>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M0 0h24v24H0z' fill='none' />
                    <path d='M18.364 4.636a9 9 0 0 1 .203 12.519l-.203.21-4.243 4.242a3 3 0 0 1-4.097.135l-.144-.135-4.244-4.243A9 9 0 0 1 18.364 4.636zM12 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z' />
                  </svg>
                  <span>
                    {project.ubicacion} <strong>{project.distrito}</strong>
                  </span>
                </p>
              </div>

              <div className='rooms'>
                <div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    style={{ enableBackground: 'new 0 0 122.88 99.94' }}
                    viewBox='0 0 122.88 99.94'
                  >
                    <path d='M4.22 67.36h114.31v-4.67c0-1.13-.22-2.18-.61-3.12-.42-1-1.04-1.89-1.81-2.66-.47-.47-1-.9-1.57-1.28-.58-.39-1.2-.73-1.85-1.02-1.75-.38-3.49-.74-5.22-1.08-1.74-.34-3.49-.66-5.25-.96-.08-.01-.14-.02-.22-.04-.89-.15-1.74-.29-2.55-.42-.81-.13-1.67-.26-2.57-.4h-.02c-6.12-.78-12.22-1.38-18.31-1.78-6.1-.4-12.17-.6-18.2-.61a273.42 273.42 0 0 0-21.41.82h-.02c-3.34.31-6.67.7-10.01 1.15-3.33.45-6.67.98-10.03 1.57l-.37.09c-.07.02-.14.03-.2.03-.06.01-.12.01-.18.01-1.57.28-3.18.59-4.84.92-1.61.32-3.22.66-4.82 1.01-.4.22-.78.47-1.14.73-.36.27-.71.56-1.02.87-.67.67-1.2 1.44-1.56 2.3-.34.81-.53 1.71-.53 2.69v5.85zM14.2 0h92.99c1.21 0 2.37.24 3.43.68a9.23 9.23 0 0 1 2.92 1.95c.83.83 1.5 1.82 1.95 2.92.44 1.06.68 2.22.68 3.43v42.69c.51.3 1.01.63 1.47.99.52.4 1.01.82 1.46 1.27 1.16 1.16 2.1 2.51 2.73 4.03.6 1.43.93 3.02.93 4.74v6.09c.03.1.06.2.08.3v.02c.02.13.03.25.03.37 0 .13-.01.26-.04.39-.02.1-.05.2-.08.3v27.66c0 .58-.24 1.11-.62 1.49-.38.38-.91.62-1.49.62h-4.35c-.49 0-.94-.17-1.3-.45-.36-.28-.63-.68-.74-1.14-.8-2.3-1.61-4.12-2.48-5.54-.86-1.4-1.78-2.4-2.84-3.11-1.07-.71-2.35-1.16-3.9-1.43-1.58-.28-3.42-.37-5.61-.36l-79.76.1h-.04c-1.57-.03-2.86.17-3.94.59a6.847 6.847 0 0 0-2.66 1.86c-.81.9-1.49 2.05-2.11 3.39-.63 1.37-1.2 2.93-1.77 4.64-.14.44-.42.79-.77 1.04-.33.24-.73.38-1.14.4-.03.01-.06.01-.09.01H2.11c-.58 0-1.11-.24-1.49-.62A2.11 2.11 0 0 1 0 97.83V61.52c0-1.57.3-3.01.84-4.31.58-1.38 1.43-2.61 2.49-3.67.3-.3.63-.6.98-.88.3-.24.6-.47.92-.68V8.89c0-1.21.24-2.36.68-3.4A8.965 8.965 0 0 1 10.78.68 8.88 8.88 0 0 1 14.2 0zm92.99 4.22H14.2c-.65 0-1.27.13-1.84.36-.59.24-1.11.59-1.55 1.02-.43.42-.78.94-1.02 1.5-.22.55-.34 1.15-.34 1.79v41.06c.3-.1.6-.18.91-.26.49-.13.98-.24 1.47-.32l2.22-.39c.6-.1 1.24-.21 1.9-.31V38.19a11.688 11.688 0 0 1 3.44-8.28 11.688 11.688 0 0 1 8.28-3.44h19.82a11.688 11.688 0 0 1 8.28 3.44 11.688 11.688 0 0 1 3.44 8.28v6.69c.7-.01 1.4-.01 2.11-.01v-6.68a11.688 11.688 0 0 1 3.44-8.28 11.688 11.688 0 0 1 8.28-3.44h19.82a11.688 11.688 0 0 1 8.28 3.44 11.688 11.688 0 0 1 3.44 8.28v10.34c.75.11 1.55.24 2.41.38.95.15 1.86.3 2.74.45.45.08.91.17 1.37.28.29.07.57.14.84.22V8.98c0-.64-.13-1.25-.36-1.81-.24-.58-.6-1.1-1.04-1.55-.44-.44-.97-.8-1.54-1.04-.56-.23-1.17-.36-1.81-.36zM43.21 45.56c2.01-.15 4.03-.28 6.08-.38 1.89-.1 3.8-.17 5.71-.22v-6.77c0-1.01-.2-1.98-.57-2.86-.38-.92-.94-1.74-1.64-2.44a7.707 7.707 0 0 0-2.44-1.64c-.88-.37-1.85-.57-2.86-.57H27.67c-1.01 0-1.98.2-2.86.57-.92.38-1.74.94-2.44 1.64-.69.69-1.25 1.52-1.64 2.44-.37.88-.57 1.85-.57 2.86V48c1.62-.24 3.26-.46 4.94-.68 1.81-.23 3.61-.44 5.39-.64.69-.08 1.43-.17 2.2-.25.72-.08 1.47-.15 2.27-.23 1.36-.13 2.71-.25 4.04-.36 1.37-.09 2.77-.19 4.21-.28zm22.33-.66a263.39 263.39 0 0 1 7.64.25h.01c2.19.08 4.33.18 6.41.3s4.11.27 6.05.44c2.82.25 5.55.55 8.14.9 2.32.32 4.52.68 6.58 1.08v-9.68c0-1.01-.2-1.98-.57-2.86-.38-.92-.94-1.74-1.64-2.44a7.707 7.707 0 0 0-2.44-1.64c-.88-.37-1.85-.57-2.86-.57H73.05c-1.01 0-1.98.2-2.86.57-.92.38-1.74.94-2.44 1.64-.69.69-1.25 1.52-1.64 2.44-.37.88-.57 1.85-.57 2.86v6.71zm53 26.69H4.22v24.13h1.43c.56-1.58 1.14-3.05 1.79-4.36.7-1.4 1.49-2.64 2.45-3.71 1.14-1.28 2.48-2.27 4.09-2.93 1.61-.65 3.49-.98 5.75-.93l79.69-.1c2.57 0 4.77.12 6.69.49 1.95.37 3.63 1 5.14 2 1.4.93 2.6 2.16 3.68 3.77 1.03 1.54 1.95 3.43 2.83 5.76h.76V71.59h.02z' />
                  </svg>
                  <p>
                    <strong>Dormitorios:</strong> <br />
                    {project.rooms}
                  </p>
                </div>
              </div>

              <div className='size'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                  className='icon icon-tabler icons-tabler-outline icon-tabler-arrows-maximize'
                  viewBox='0 0 24 24'
                >
                  <path stroke='none' d='M0 0h24v24H0z' />
                  <path d='M16 4h4v4M14 10l6-6M8 20H4v-4M4 20l6-6M16 20h4v-4M14 14l6 6M8 4H4v4M4 4l6 6' />
                </svg>
                <div>
                  <p>
                    <strong>Desde</strong>
                    <br />
                    {project.minSize}m<sup>2</sup>
                  </p>
                  <p>
                    <strong>Hasta</strong>
                    <br />
                    {project.maxSize}m<sup>2</sup>
                  </p>
                </div>
              </div>

              <div className='pricing'>
                <div>
                  <p>
                    <strong>DESDE</strong>
                  </p>
                  <h3>{project.price}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className='financia'>
            <div>
              <p>
                <strong>FINANCIA:</strong>
              </p>
              <picture>
                <Image width={200} height={50} priority src='/details/logo-interbank.webp' alt='Logo Banco' />
              </picture>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
