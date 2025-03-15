'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import '../styles/components/contactForm.css'

export default function ContactForm ({ param }) {
  useEffect(() => {
    const form = document.getElementById('contactForm')
    if (form) {
      form.addEventListener('submit', async function (event) {
        event.preventDefault()
        try {
          const json_data = validarFormulario()
          if (json_data === false) {
            return
          }

          // Enviar datos a la API
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(json_data)
          })
          const result = await response.json()
          if (result.success) {
            alert('Formulario enviado correctamente.')
            form.reset()
            // Opcional: quitar la clase filled de los inputs
            const elements = document.querySelectorAll(
              '.contact-form__form input, .contact-form__form select, .contact-form__form textarea'
            )
            elements.forEach(el => {
              const parentDiv = el.closest('.contact-form__section')
              if (parentDiv) {
                parentDiv.classList.remove('filled')
              }
            })
          } else {
            alert('Error: ' + result.error)
          }
        } catch (error) {
          console.error('Error inesperado:', error)
          alert('Ocurrió un error inesperado. Por favor, intenta nuevamente.')
        }
      })

      // Función de validación de los campos del formulario
      function validarFormulario () {
        var nombre = document.getElementById('nombre').value.trim()
        var apellido = document.getElementById('apellido').value.trim()
        var proyecto = document.getElementById('proyecto').value.trim()
        var tipoDocumento = document
          .getElementById('tipo_documento')
          .value.trim()
        var dni = document.getElementById('dni').value.trim()
        var telefono = document.getElementById('telefono').value.trim()
        var email = document.getElementById('email').value.trim()
        var mensaje = document.getElementById('mensaje').value.trim()

        var regexLetras = /^[A-Za-zÀ-ÿ\s]+$/
        var regexNumeros = /^[0-9]+$/
        var regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        var regexMensaje = /^[A-Za-zÀ-ÿ0-9\s.,;:()¿?¡!'"%-]*$/

        if (nombre.length > 50 || !regexLetras.test(nombre)) {
          alert(
            'El nombre no debe exceder los 50 caracteres y solo debe contener letras y espacios.'
          )
          return false
        }
        if (apellido.length > 50 || !regexLetras.test(apellido)) {
          alert(
            'El apellido no debe exceder los 50 caracteres y solo debe contener letras y espacios.'
          )
          return false
        }
        if (proyecto === '') {
          alert('Debe seleccionar un proyecto de interés.')
          return false
        }
        if (tipoDocumento === '') {
          alert('Debe seleccionar un tipo de documento.')
          return false
        }
        if (
          tipoDocumento === '1' &&
          (dni.length !== 8 || !regexNumeros.test(dni))
        ) {
          alert('El DNI debe tener exactamente 8 dígitos numéricos.')
          return false
        }
        if (
          tipoDocumento === '4' &&
          (dni.length < 9 || dni.length > 11 || !regexNumeros.test(dni))
        ) {
          alert(
            'El Carnet de Extranjería debe tener entre 9 y 11 dígitos numéricos.'
          )
          return false
        }
        if (telefono.length > 21 || !regexNumeros.test(telefono)) {
          alert(
            'El teléfono no debe exceder los 21 caracteres y solo debe contener números.'
          )
          return false
        }
        if (!regexEmail.test(email)) {
          alert('Ingrese un correo electrónico válido.')
          return false
        }
        if (mensaje.length > 150 || !regexMensaje.test(mensaje)) {
          alert(
            'El mensaje no debe exceder los 150 caracteres y no debe contener caracteres no permitidos.'
          )
          return false
        }

        return {
          // Los nombres de los campos deben coincidir con lo que espera la API
          IdTipoPortal: 10,
          IdProyecto: parseInt(proyecto, 10),
          IdTipoDocumento: parseInt(tipoDocumento, 10),
          NroDocumento: dni,
          Nombres: nombre,
          Apellidos: apellido,
          Correo: email,
          Celular: telefono,
          Comentario: mensaje,
          IncluyeUtm: false
        }
      }

      // Agregar listeners a inputs, selects y textareas para animaciones de focus/filled
      const inputsAndSelectsAndTextareas = document.querySelectorAll(
        '.contact-form__form input, .contact-form__form select, .contact-form__form textarea'
      )

      inputsAndSelectsAndTextareas.forEach(element => {
        element.addEventListener('focus', () => {
          const parentDiv = element.closest('.contact-form__section')
          if (parentDiv) {
            parentDiv.classList.add('inFocus')
          }
        })

        element.addEventListener('blur', () => {
          const parentDiv = element.closest('.contact-form__section')
          if (parentDiv) {
            parentDiv.classList.remove('inFocus')
          }
        })

        element.addEventListener('input', () => {
          const parentDiv = element.closest('.contact-form__section')
          if (parentDiv) {
            if (
              element.value.trim() !== '' ||
              (element.tagName.toLowerCase() === 'select' &&
                element.selectedIndex !== 0)
            ) {
              parentDiv.classList.add('filled')
            } else {
              parentDiv.classList.remove('filled')
            }
          }
        })

        if (element.tagName.toLowerCase() === 'select') {
          element.addEventListener('change', () => {
            const parentDiv = element.closest('.contact-form__section')
            if (parentDiv) {
              if (element.value.trim() !== '' || element.selectedIndex !== 0) {
                parentDiv.classList.add('filled')
              } else {
                parentDiv.classList.remove('filled')
              }
            }
          })
        }
      })
    }
  }, [])

  return (
    <>
      <section className='contact-form'>
        <Image
          className='flecha_1'
          src='/flecha-gris.png'
          alt='Flecha gris'
          width={50}
          height={50}
        />

        <Image
          className='flecha_2'
          src='/flecha-gris.png'
          alt='Flecha gris'
          width={50}
          height={50}
        />

        <div className='contact-form__container'>
          <div className='contact-form__description'>
            <h2 className='contact-form__title'>
              ¡Queremos
              <br />
              saber{' '}
              <span className='contact-form__title--highlight'>más de ti!</span>
            </h2>
            <p className='contact-form__text'>
              Compártenos tus datos y te ayudaremos a dar el siguiente paso
              hacia tu nuevo hogar
            </p>
          </div>

          <div className='contact-form__form-wrapper'>
            <form
              className='contact-form__form'
              action=''
              method='POST'
              id='contactForm'
            >
              <Image
                src='/verdi-formulario.png'
                alt='Verdi'
                width={300}
                height={150}
              />

              <div className='contact-form__row double'>
                <div className='contact-form__section'>
                  <input
                    type='text'
                    id='nombre'
                    name='nombre'
                    className='contact-form__input'
                    required
                  />
                  <label htmlFor='nombre' className='contact-form__label'>
                    <span>Nombres</span>
                  </label>
                </div>
                <div className='contact-form__section'>
                  <input
                    type='text'
                    id='apellido'
                    name='apellido'
                    className='contact-form__input'
                    required
                  />
                  <label htmlFor='apellido' className='contact-form__label'>
                    <span>Apellidos</span>
                  </label>
                </div>
              </div>

              <div className='contact-form__row'>
                <div className='contact-form__section select-div'>
                  <label htmlFor='proyecto' className='contact-form__label'>
                    <span>Proyecto de interés</span>
                  </label>
                  <select
                    id='proyecto'
                    name='proyecto'
                    className='contact-form__select'
                    required
                  >
                    <option value=''></option>
                    <option value='1646'>Seed Growing Home</option>
                    <option value='1647'>Soil Quality Home</option>
                  </select>
                </div>
              </div>

              <div className='contact-form__row double'>
                <div className='contact-form__section select-div'>
                  <label
                    htmlFor='tipo_documento'
                    className='contact-form__label'
                  >
                    <span>Tipo de Documento</span>
                  </label>
                  <select
                    id='tipo_documento'
                    name='tipo_documento'
                    className='contact-form__select'
                    required
                  >
                    <option value=''></option>
                    <option value='1'>DNI</option>
                    <option value='4'>CE</option>
                  </select>
                </div>
                <div className='contact-form__section'>
                  <input
                    type='text'
                    id='dni'
                    name='dni'
                    className='contact-form__input'
                    required
                  />
                  <label htmlFor='dni' className='contact-form__label'>
                    <span>DNI o Carnet de extranjería</span>
                  </label>
                </div>
              </div>

              <div className='contact-form__row double'>
                <div className='contact-form__section'>
                  <input
                    type='tel'
                    id='telefono'
                    name='telefono'
                    className='contact-form__input'
                    required
                  />
                  <label htmlFor='telefono' className='contact-form__label'>
                    <span>Teléfono</span>
                  </label>
                </div>
                <div className='contact-form__section'>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    className='contact-form__input'
                    required
                  />
                  <label htmlFor='email' className='contact-form__label'>
                    <span>Correo Electrónico</span>
                  </label>
                </div>
              </div>

              <div className='contact-form__row'>
                <div className='contact-form__section'>
                  <textarea
                    id='mensaje'
                    name='mensaje'
                    className='contact-form__textarea'
                    rows='3'
                    required
                  ></textarea>
                  <label htmlFor='mensaje' className='contact-form__label'>
                    <span>Mensaje</span>
                  </label>
                </div>
              </div>

              <button type='submit' className='contact-form__submit-button'>
                Enviar
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
