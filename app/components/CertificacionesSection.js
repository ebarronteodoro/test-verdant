'use client'

import Image from 'next/image'
import { useEffect } from 'react'

export default function CertificacionesSection () {
  useEffect(() => {
    const image = document.querySelector('.zoom-out-image')

    function handleIntersection (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('zoom-out-active')
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5
    })

    if (image) {
      observer.observe(image)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const buttons = document.querySelectorAll(
        '.certificaciones-section aside article button'
      )

      function toggleActive (event) {
        const article = event.currentTarget.closest('article')
        if (article) {
          article.classList.toggle('active')
        }
      }

      buttons.forEach(button => button.addEventListener('click', toggleActive))

      return () => {
        buttons.forEach(button =>
          button.removeEventListener('click', toggleActive)
        )
      }
    }
  }, [])

  return (
    <section className='certificaciones-section'>
      <div className='certificaciones-section__container'>
        <span>Certificaciones</span>
        <div className='certificaciones-section__info'>
          <h3>Nuestro Compromiso Sostenible</h3>
          <p>
            A lo largo de nuestra trayectoria hemos logrado alcanzar altos
            estándares de sostenibilidad e innovación. Siendo avalados por un
            sello regulador y por nuestras certificaciones.
          </p>
        </div>
        <picture>
          <Image
            width={480}
            height={480}
            className='zoom-out-image'
            src='/nosotros/seed-dron-picture.png'
            alt='Fotografía de Seed tomada con un dron'
          />
        </picture>
        <aside>
          <article>
            <header>
              <figure>
                <Image
                  width={180}
                  height={100}
                  src='/nosotros/asei-footer.png'
                  alt='Logotipo de ASEI'
                />
                <figcaption>
                  Asociación De Empresas Inmobiliarias Del Perú
                </figcaption>
              </figure>
            </header>
            <p>
              Promueve e impulsa el desarrollo del sector inmobiliario en el
              Perú.
            </p>
            <button>
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
            </button>
          </article>
          <article>
            <header>
              <figure>
                <Image
                  width={180}
                  height={100}
                  src='/nosotros/vivienda-footer.webp'
                  alt='Logotipo de Mi Vivienda Verde'
                />
                <figcaption>Mi Vivienda Verde</figcaption>
              </figure>
            </header>
            <p>
              Promueve tecnologías ecoeficientes, materiales sostenibles y
              sistemas que ahorran agua y energía.
            </p>
            <button>
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
            </button>
          </article>
          <article>
            <header>
              <figure>
                <Image
                  width={180}
                  height={100}
                  src='/nosotros/edge-footer.png'
                  alt='Logotipo de Edge'
                />
                <figcaption>Certificación Edge</figcaption>
              </figure>
            </header>
            <p>
              Garantiza que tu nuevo hogar ha sido diseñado para maximizar el
              uso eficiente y sostenible de los recursos.
            </p>
            <button>
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
            </button>
          </article>
        </aside>
      </div>
    </section>
  )
}
