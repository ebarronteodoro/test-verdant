'use client'

import { useEffect, useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import Image from 'next/image'
import '../styles/components/typologyFetcher.css'

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
    const selectedId = event.target.value
    setSelectedTypologyId(selectedId)
    const selectedIndex = filteredTypologies.findIndex(
      typo => typo.typology_id === parseInt(selectedId)
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

  // Función de validación similar a la lógica original en JS
  // Función de validación similar a la lógica original en JS
  function validarFormulario () {
    const form = document.getElementById('typology-form')

    // Selección de campos del formulario
    const typologyInput = form.querySelector('select[name="typology"]')
    const nombreInput = form.querySelector('input[name="first_name"]')
    const apellidoInput = form.querySelector('input[name="last_name"]')
    const telefonoInput = form.querySelector('input[name="phone"]')
    const emailInput = form.querySelector('input[name="email"]')
    const tipoDocumentoInput = form.querySelector(
      'select[name="document_type"]'
    )
    const dniInput = form.querySelector('input[name="dni"]')
    const mensajeInput = form.querySelector('textarea[name="message"]')
    const termsInput = form.querySelector('input[name="terms"]')

    // Validación: Verificar si los campos requeridos existen
    if (
      !typologyInput ||
      !nombreInput ||
      !apellidoInput ||
      !emailInput ||
      !dniInput ||
      !termsInput
    ) {
      alert('Faltan campos obligatorios en el formulario.')
      return false
    }

    // Obtener valores de los campos
    const typology = typologyInput.value.trim()
    const first_name = nombreInput.value.trim()
    const last_name = apellidoInput.value.trim()
    const phone = telefonoInput ? telefonoInput.value.trim() : null
    const email = emailInput.value.trim()
    const document_type = tipoDocumentoInput
      ? tipoDocumentoInput.value.trim()
      : 'DNI'
    const dni = dniInput.value.trim()
    const message = mensajeInput ? mensajeInput.value.trim() : null
    const termsAccepted = termsInput.checked

    // Expresiones regulares para validación (opcional)
    const regexLetras = /^[A-Za-zÀ-ÿ\s]+$/ // Nombres y apellidos
    const regexNumeros = /^[0-9]+$/ // Teléfonos y DNI
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // Correos electrónicos

    if (!typology) {
      alert('Por favor, selecciona una tipología.')
      return false
    }
    if (!first_name || !regexLetras.test(first_name)) {
      alert('Por favor, ingresa un nombre válido.')
      return false
    }
    if (!last_name || !regexLetras.test(last_name)) {
      alert('Por favor, ingresa un apellido válido.')
      return false
    }
    if (phone && !regexNumeros.test(phone)) {
      alert('Por favor, ingresa un número de teléfono válido.')
      return false
    }
    if (!email || !regexEmail.test(email)) {
      alert('Por favor, ingresa un correo electrónico válido.')
      return false
    }
    if (!dni || !regexNumeros.test(dni)) {
      alert('Por favor, ingresa un número de documento válido.')
      return false
    }
    if (!termsAccepted) {
      alert('Debes aceptar los términos y condiciones.')
      return false
    }

    // Mapeo para asignar el ID numérico según el projectId recibido como prop
    const projectMapping = {
      seed: 1646,
      soil: 1647
    }
    const numericProjectId = projectMapping[projectId] || projectId

    // Retornar datos organizados para evolta, db y mailer (con todos los campos del formulario)
    return {
      evolta: {
        IdTipoPortal: 10,
        IdProyecto: numericProjectId,
        IdTipoDocumento: document_type === 'DNI' ? 1 : 4,
        NroDocumento: dni,
        Nombres: first_name,
        Apellidos: last_name,
        Correo: email,
        Celular: phone || null,
        Comentario: `Tipología: ${typology}\n${
          message ? message : 'No se proporcionó mensaje.'
        }`,
        IncluyeUtm: false
      },
      db: {
        IdProyecto: numericProjectId,
        IdTipoDocumento: document_type === 'DNI' ? 1 : 4,
        NroDocumento: dni,
        Nombres: first_name,
        Apellidos: last_name,
        Correo: email,
        Celular: phone || null,
        Comentario: message || null,
        typology: typology || null,
        IncluyeUtm: false
      },
      // mailer: {
      //   typology,
      //   first_name,
      //   last_name,
      //   phone,
      //   email,
      //   document_type,
      //   dni,
      //   message: message || 'No se proporcionó mensaje.',
      //   termsAccepted,
      //   projectId: numericProjectId
      // }
    }
  }

  // Handler del submit del formulario
  async function handleSubmit (event) {
    event.preventDefault()
    const form = document.getElementById('typology-form')
    if (!form) return

    // Validar formulario y obtener datos
    const json_data = validarFormulario()
    if (json_data === false) return

    console.log('Datos validados:', json_data)

    try {
      const response = await fetch('/api/submit-typology', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json_data)
      })

      if (!response.ok) {
        throw new Error('Error al enviar la solicitud')
      }

      const result = await response.json()
      console.log('Respuesta del servidor:', result)
      if (result.success) {
        alert('Formulario enviado correctamente.')
        form.reset()
      } else {
        alert('Error: ' + result.error)
      }
    } catch (error) {
      console.error('Error:', error.message)
      alert(`Ocurrió un error: ${error.message}`)
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

            {/* Se agrega el onSubmit al formulario */}
            <form id='typology-form' className='form' onSubmit={handleSubmit}>
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
