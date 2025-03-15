import Layout from '../Layouts/layout'
import LoadingOverlay from '../components/LoadingOverlay'
import RefiereForm from '../components/RefiereForm'
import '../styles/refiere.css'
import Image from 'next/image'

export const metadata = {
  title: 'Refiere y Gana | Verdânt Inmobiliaria',
  description:
    'Refiere a tus amigos y gana increíbles premios con Verdânt Inmobiliaria.',
  keywords: 'refiere, gana, premios, verdânt'
}

export default function Page () {
  return (
    <Layout>
      <LoadingOverlay />
      <section className='info-section'>
        <div className='info-section__container'>
          <div className='info-section__title'>
            <h1>
              ¡Refiere y<br />
              <span>Gana!</span>
            </h1>
            <p>
              ¡Por cada referido ganas
              <br />
              <span>s/.2,000.00 !</span>
            </p>
            <Image
              width={170}
              height={80}
              alt='Flecha gris decorativa de guía'
              className='arrow flecha_1'
              src='/flecha-gris.png'
            />
          </div>
          <picture>
            <Image
              width={400}
              height={300}
              src='/refiere/refiere-pig.png'
              alt='Alcancía sobre monedas'
            />
            <Image
              width={170}
              height={80}
              alt='Flecha gris decorativa de guía'
              className='arrow flecha_2'
              src='/flecha-gris.png'
            />
          </picture>
          <ul>
            <li>
              <div className='bubble'>
                Recomienda a un amigo o conocido
                <span className='corner'></span>
              </div>
              <div className='message'>
                Invita a esa persona que sueña con su hogar
              </div>
            </li>
            <li>
              <div className='message'>
                Llena nuestro formulario de referidos con los datos de tu
                contacto
              </div>
              <div className='bubble'>
                Regístralo fácilmente
                <span className='corner'></span>
              </div>
            </li>
            <li>
              <div className='bubble'>
                Nosotros hacemos el resto
                <span className='corner'></span>
              </div>
              <div className='message'>
                Nuestro equipo se pondrá en contacto con tu referido,
                brindándole la mejor asesoría
              </div>
            </li>
            <Image
              width={170}
              height={80}
              alt='Flecha gris decorativa de guía'
              className='arrow flecha_3'
              src='/flecha-gris.png'
            />
          </ul>
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
        </div>
      </section>
      <RefiereForm />
    </Layout>
  )
}
