import './styles/home.css' // ✅ Importamos su CSS propio
import Layout from './Layouts/layout'
import ProjectsSection from './components/ProjectsSection'
import Link from 'next/link'
import FilterSection from './components/FilterSection'
import TestimonialsSection from './components/TestimonialsSection'
import MapSection from './components/MapSection'
import TimeLine from './components/TimeLine'
import ContactForm from './components/ContactForm'
import Offers from './components/Offers'
import DontGoComponent from './components/DontGo'
import Image from 'next/image'

export const metadata = {
  title: 'Verdânt Inmobiliaria',
  description:
    'Descubre Verdânt Inmobiliaria, líder en venta de departamentos sostenibles en Lima. Encuentra tu próximo hogar en las mejores ubicaciones',
  keywords: 'proyectos inmobiliarios, departamentos, Verdânt, venta de departamentos en lima, inmobiliaria lima'
}

export default async function Home () {
  return (
    <Layout>
      <FilterSection />

      <section className='projects-section'>
        <ProjectsSection param={'index'} />
      </section>

      <section className='cta-section'>
        <aside className='cta-container'>
          <div className='cta-text'>
            <p>¿Interesado en algún proyecto?</p>
            <strong>¡Conversemos ahora!</strong>
          </div>
          <div className='cta-buttons'>
            <Link href='proyectos' className='btn btn-outline'>
              Ir a Proyectos
            </Link>
            <Link href='contacto' className='btn btn-solid'>
              Contactar
            </Link>
          </div>
        </aside>
      </section>

      <section className='nosotros-section'>
        <div className='nosotros-section__container'>
          <div className='nosotros-data'>
            <span>NOSOTROS</span>
            <h2>Estamos altamente comprometidos contigo y con el planeta</h2>
            <p>Nos dedicamos a construir futuros más sostenibles</p>
            <Link href='nosotros'>Conócenos</Link>
          </div>
          <div className='nosotros-img'>
            <div className='nosotros-img__1'>
              <picture>
                <Image
                  width={200}
                  height={260}
                  src='/index/bienestar.png'
                  alt='Location Icon'
                />
              </picture>

              <span>Bienestar</span>
            </div>
            <div className='nosotros-img__2'>
              <picture>
                <Image
                  width={200}
                  height={260}
                  src='/index/sostenibilidad.png'
                  alt='Location Icon'
                />
              </picture>

              <span>Sostenibilidad</span>
            </div>
            <div className='nosotros-img__3'>
              <picture>
                <Image
                  width={350}
                  height={260}
                  src='/index/seguridad.png'
                  alt='Location Icon'
                />
              </picture>

              <span>Seguridad</span>
            </div>
          </div>
        </div>
        <Image
          width={2000}
          height={120}
          src='/barra-hojas.png'
          alt='Barra hojas'
        />
      </section>

      <section className='certificaciones-section'>
        <h3>
          Conoce Nuestras <span>Certificaciones</span>
        </h3>
        <div className='certificaciones-section__container'>
          <div className='certificado__1'>
            <Image
              width={140}
              height={80}
              src='/nosotros/asei-footer.png'
              className='item'
              alt='Logotipo Asei'
            />
            <span>
              Asociación De Empresas
              <br />
              Inmobiliarias Del Perú
            </span>
          </div>
          <div className='certificado__2'>
            <Image
              width={100}
              height={80}
              src='/nosotros/vivienda-footer.webp'
              className='item'
              alt='Logotipo Vivienda'
            />
            <span>Mi Vivienda Verde</span>
          </div>
          <div className='certificado__3'>
            <Image
              width={200}
              height={80}
              src='/nosotros/edge-footer.png'
              className='item'
              alt='Logotipo Edge'
            />
            <span>Certificación Edge</span>
          </div>
        </div>
        <Link href='nosotros' className='certificado-button'>
          Saber más
        </Link>
        <Image
          width={2000}
          height={120}
          src='/barra-hojas.png'
          alt='Barra hojas'
        />
      </section>

      <TestimonialsSection></TestimonialsSection>

      <MapSection tomtom_apikey={process.env.MAP_APIKEY}></MapSection>

      <TimeLine></TimeLine>

      <ContactForm></ContactForm>

      <Offers></Offers>
      <DontGoComponent variant='standard' />
    </Layout>
  )
}
