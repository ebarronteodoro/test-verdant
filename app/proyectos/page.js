import Image from 'next/image'
import DontGoComponent from '../components/DontGo'
import MapSection from '../components/MapSection'
import ProjectsSection from '../components/ProjectsSection'
import TimeLine from '../components/TimeLine'
import Layout from '../Layouts/layout'
import '../styles/proyectos.css'

export const metadata = {
  title: 'Proyectos | Verdant Inmobiliaria',
  description:
    'Descubre los mejores proyectos inmobiliarios con Verdant. Encuentra tu nuevo hogar con las mejores ubicaciones y diseños modernos.',
  keywords: 'proyectos inmobiliarios, departamentos, Verdant'
}

export default function Home () {
  return (
    <Layout>
      <section className='insale_proyects-section'>
        <Image
          width={80}
          height={80}
          src='/leaf-3.png'
          className='leaf-testimonial leaf-1'
          alt='Decoración de Hojas'
        />
        <Image
          width={100}
          height={100}
          src='/leaf-4.png'
          className='leaf-testimonial leaf-2'
          alt='Decoración de Hojas'
        />
        <Image
          width={90}
          height={130}
          src='/leaf-5.png'
          className='leaf-testimonial leaf-3'
          alt='Decoración de Hojas'
        />
        <Image
          width={80}
          height={80}
          src='/leaf-4.png'
          className='leaf-testimonial leaf-4'
          alt='Decoración de Hojas'
        />
        <h1>
          Proyectos <strong>En Venta</strong>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M0 0h24v24H0z' stroke='none'></path>
            <path d='m6 9 6 6 6-6'></path>
          </svg>
        </h1>
        <ProjectsSection param='proyectos' />
      </section>
      <TimeLine></TimeLine>
      <MapSection></MapSection>
      <DontGoComponent variant='standard' />
    </Layout>
  )
}
