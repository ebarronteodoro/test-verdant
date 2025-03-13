'use client'

import { useEffect, useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import Image from 'next/image'

export default function TypologyFetcher ({ projectId }) {
  const [typologies, setTypologies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filteredTypologies, setFilteredTypologies] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedTypologyId, setSelectedTypologyId] = useState('')
  const swiperRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/typology_features?project=${projectId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': 'verdant-key'
            },
            cache: 'no-store'
          }
        )

        if (!response.ok) {
          throw new Error('Error al obtener datos de la API')
        }

        const data = await response.json()
        setTypologies(data)
        setFilteredTypologies(data)
        if (data.length > 0) {
          setSelectedTypologyId(data[0].typology_id)
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [projectId])

  useEffect(() => {
    if (filteredTypologies.length > 0) {
      setSelectedTypologyId(filteredTypologies[0].typology_id)
    }
  }, [filteredTypologies])

  const handleSelectChange = event => {
    const selectedTypologyId = event.target.value
    setSelectedTypologyId(selectedTypologyId)
    const selectedIndex = filteredTypologies.findIndex(
      typo => typo.typology_id === parseInt(selectedTypologyId)
    )
    if (swiperRef.current && selectedIndex !== -1) {
      swiperRef.current.swiper.slideTo(selectedIndex)
    }
  }

  const handleFilterClick = bedroomCount => {
    setActiveFilter(bedroomCount)
    if (bedroomCount === 'all') {
      setFilteredTypologies(typologies)
    } else {
      setFilteredTypologies(
        typologies.filter(typo => typo.bedroom_count === parseInt(bedroomCount))
      )
    }
  }

  const handleSlideChange = () => {
    if (swiperRef.current) {
      const activeIndex = swiperRef.current.swiper.activeIndex
      const activeTypology = filteredTypologies[activeIndex]
      if (activeTypology) {
        setSelectedTypologyId(activeTypology.typology_id)
      }
    }
  }

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

      {loading ? (
        <div className='loading-message'>
          <p>Cargando tipologías...</p>
        </div>
      ) : error ? (
        <div className='error-message'>
          <p>Error: {error}</p>
        </div>
      ) : (
        <div className='typology-container'>
          <div className='typology-carousel'>
            <Swiper
              ref={swiperRef}
              modules={[Navigation]}
              slidesPerView={1}
              spaceBetween={10}
              navigation
              className='typology-image swiper mySwiperTypologies'
              onSlideChange={handleSlideChange}
            >
              {filteredTypologies.map(typo => (
                <SwiperSlide key={typo.typology_id}>
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
                            label: `${typo.features[0].bathrooms} Baños`,
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
                        ].map(({ label, icon }, index) => (
                          <li key={index}>
                            <Image
                              className='icon'
                              src={icon}
                              width={30}
                              height={30}
                              alt={`Icono de ${label}`}
                            />
                            <span>{label}</span>
                          </li>
                        ))}
                      </ul>
                    </aside>
                  </figure>
                </SwiperSlide>
              ))}
            </Swiper>
            <Image
              width={130}
              height={121}
              className='blue-leafs'
              src='/blue-leafs.png'
              alt='Hojas azules de adorno'
            />
          </div>

          <div className='form-container'>
            <Image
              width={130}
              height={121}
              className='green-leafs'
              src='/green-leafs.png'
              alt='Hojas verdes de adorno'
            />
            <div className='typology-info'>
              <div className='typology-filter'>
                <span>Nº Dormitorios:</span>
                <div className='filter-buttons'>
                  <button
                    className={`filter-btn ${
                      activeFilter === 'all' ? 'active' : ''
                    }`}
                    onClick={() => handleFilterClick('all')}
                  >
                    Todas
                  </button>
                  <button
                    className={`filter-btn ${
                      activeFilter === 1 ? 'active' : ''
                    }`}
                    onClick={() => handleFilterClick(1)}
                  >
                    1
                  </button>
                  <button
                    className={`filter-btn ${
                      activeFilter === 2 ? 'active' : ''
                    }`}
                    onClick={() => handleFilterClick(2)}
                  >
                    2
                  </button>
                  <button
                    className={`filter-btn ${
                      activeFilter === 3 ? 'active' : ''
                    }`}
                    onClick={() => handleFilterClick(3)}
                  >
                    3
                  </button>
                </div>
              </div>
            </div>

            <form id='typology-form' className='form'>
              <div className='form-group'>
                <select
                  id='typology-select'
                  name='typology'
                  required
                  onChange={handleSelectChange}
                  value={selectedTypologyId}
                >
                  {filteredTypologies.map(typo => (
                    <option key={typo.typology_id} value={typo.typology_id}>
                      {typo.typology_name}
                    </option>
                  ))}
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
                <input
                  type='number'
                  name='dni'
                  placeholder='Número*'
                  required
                />
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
      )}
    </section>
  )
}
