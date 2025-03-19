'use client'

import { useEffect } from 'react'

export default function ContactFormScript () {
  useEffect(() => {
    const form = document.getElementById('form_contact')
    if (form) {
      form.addEventListener('submit', async function (event) {
        event.preventDefault()

        const json_data = validarFormulario()
        if (!json_data) return

        try {
          const response = await fetch('/api/contact_form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(json_data)
          })
          const result = await response.json()
          if (result.success) {
            alert('¡Formulario enviado correctamente!')
            form.reset()
          } else {
            alert('Error al guardar el formulario: ' + result.error)
          }
        } catch (error) {
          console.error('Error enviando el formulario:', error)
          alert('Error al enviar el formulario. Por favor, intenta nuevamente.')
        }
      })
    }

    const inputsAndTextareas = document.querySelectorAll(
      'form input, form select, form textarea'
    )

    inputsAndTextareas.forEach(element => {
      element.addEventListener('focus', () => {
        const parentDiv = element.closest('.row, .text-area, div')
        if (parentDiv) {
          parentDiv.classList.add('inFocus')
        }
      })

      element.addEventListener('blur', () => {
        const parentDiv = element.closest('.row, .text-area, div')
        if (parentDiv) {
          parentDiv.classList.remove('inFocus')
        }
      })

      element.addEventListener('input', () => {
        const parentDiv = element.closest('.row, .text-area, div')
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
          const parentDiv = element.closest('.row, .text-area, div')
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

    function validarFormulario () {
      const nombre = document.getElementById('name').value.trim()
      const apellido = document.getElementById('lastname').value.trim()
      const proyecto = document.getElementById('project').value.trim()
      const document_type = document
        .querySelector("select[name='document_type']")
        .value.trim()
      const dni = document.getElementById('identification').value.trim()
      const telefono = document.getElementById('phone').value.trim()
      const email = document.getElementById('email').value.trim()
      const mensaje = document.getElementById('message').value.trim()
      const termsChecked = document.getElementById('terms').checked

      // Aquí podrías agregar validaciones adicionales

      return {
        IdTipoPortal: 10,
        IdProyecto: parseInt(proyecto, 10),
        IdTipoDocumento: document_type === 'DNI' ? 1 : 4,
        NroDocumento: dni,
        Nombres: nombre,
        Apellidos: apellido,
        Correo: email,
        Celular: telefono,
        Comentario: mensaje,
        IncluyeUtm: false
      }
    }

    return () => {
      if (form) {
        form.removeEventListener('submit', () => {})
      }
      inputsAndTextareas.forEach(element => {
        element.removeEventListener('focus', () => {})
        element.removeEventListener('blur', () => {})
        element.removeEventListener('input', () => {})
        if (element.tagName.toLowerCase() === 'select') {
          element.removeEventListener('change', () => {})
        }
      })
    }
  }, [])

  return null
}
