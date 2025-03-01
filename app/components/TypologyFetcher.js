'use client'

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import Image from 'next/image'

export default function TypologyFetcher ({ projectId }) {
  const [typologies, setTypologies] = useState([])
  const [features, setFeatures] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typologiesRes, featuresRes] = await Promise.all([
          fetch(`/api/typologies?project=${projectId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store'
          }),
          fetch(`/api/typology_features?project=${projectId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store'
          })
        ])

        if (!typologiesRes.ok || !featuresRes.ok) {
          throw new Error('Error al obtener datos de la API')
        }

        const typologiesData = await typologiesRes.json()
        const featuresData = await featuresRes.json()

        console.log(featuresData)

        setTypologies(typologiesData)
        setFeatures(
          featuresData.reduce((acc, feature) => {
            acc[feature.typology_id] = feature.features
            return acc
          }, {})
        )
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [projectId])

  if (loading) return <p>Cargando tipologías...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <section className='cotizacion-section' id='cotiza'>
      <Image
        width={2000}
        height={500}
        src='/barra-hojas.png'
        alt='Barra hojas'
      />
      <h2>¡Cotiza tu depa ideal!</h2>
      <h3>Estás a un paso de ser parte de la familia Verdânt</h3>

      <div className='arrow_container'>
        <Image
          width={250}
          height={120}
          className='flecha_1'
          src='/flecha-gris-down.png'
          alt='Flecha Gris'
        />
      </div>

      <div className='typology-container'>
        <div className='typology-carousel'>
          <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={10}
            navigation
            className='typology-image swiper mySwiperTypologies'
          >
            {typologies.map(typo => (
              <SwiperSlide key={typo.id}>
                <figure className='typo-figure swiper-slide'>
                  <Image
                    width={550}
                    height={550}
                    src={`/typo-images/${projectId}/${typo.typology_name}.png`}
                    alt={`Imagen de tipología: ${typo.typology_name}`}
                  />
                  <aside className='typo-details'>
                    <ul className='details-list'>
                      {[
                        {
                          label: `${typo.bedroom_count} Dorm${
                            typo.bedroom_count > 1 ? '+ Estudio' : ''
                          }`,
                          icon: '/icons/bed.svg'
                        },
                        {
                          label: `${typo.bathrooms} Baños`,
                          icon: '/icons/toiletIcon.png'
                        },
                        {
                          label: 'Sala - Comedor',
                          icon: '/icons/sofaIcon.png'
                        },
                        { label: 'Cocina', icon: '/icons/kitchenIcon.png' },
                        {
                          label: 'Lavandería',
                          icon: '/icons/washmachineIcon.png'
                        }
                      ]
                        .concat(features[typo.id] || [])
                        .map(({ label, icon }, index) => (
                          <li key={index}>{label}</li>
                        ))}
                    </ul>
                  </aside>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
          <img
            className='blue-leafs'
            src='/blue-leafs.png'
            alt='Hojas azules de adorno'
          />
        </div>

        <div className='form-container'>
          <img
            className='green-leafs'
            src='/green-leafs.png'
            alt='Hojas verdes de adorno'
          />
          <div className='typology-info'>
            <div className='typology-filter'>
              <span>Nº Dormitorios:</span>
              <div className='filter-buttons'>
                <button className='filter-btn active'>Todas</button>
                <button className='filter-btn'>1</button>
                <button className='filter-btn'>2</button>
                <button className='filter-btn'>3</button>
              </div>
            </div>
          </div>

          <form id='typology-form' className='form'>
            <div className='form-group'>
              <select id='typology-select' name='typology' required>
                <option value=''>Cargando...</option>
              </select>
            </div>

            <div className='form-group'>
              <input
                type='text'
                name='first_name'
                placeholder='Nombres*'
                required
              />
              <input
                type='text'
                name='last_name'
                placeholder='Apellidos*'
                required
              />
            </div>

            <div className='form-group'>
              <input type='tel' name='phone' placeholder='Teléfono*' />
              <input
                type='email'
                name='email'
                placeholder='Correo electrónico*'
                required
              />
            </div>

            <div className='form-group-2'>
              <select
                type='text'
                name='document_type'
                placeholder='Documento'
                defaultValue={'DNI'}
              >
                <option value='DNI'>DNI</option>
                <option value='C.E'>C.E</option>
              </select>
              <input type='number' name='dni' placeholder='Número*' required />
            </div>

            <div className='form-group'>
              <textarea name='message' placeholder='Mensaje'></textarea>
            </div>

            <div className='form-footer'>
              <label>
                <input type='checkbox' name='terms' required />
                Acepto los términos y condiciones
              </label>
              <button type='submit' className='submit-button'>
                Enviar datos
              </button>
            </div>
          </form>

          <div id='response-message'></div>
        </div>
      </div>
    </section>
  )
}
