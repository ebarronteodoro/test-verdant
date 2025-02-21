'use client'

import { useEffect, useRef, useState } from 'react'
import styles from '../styles/components/verdant-floating-button.module.css'

export default function VerdantFloatingButton () {
  const walinkButtonRef = useRef(null)
  const textOverlayRef = useRef(null)
  const ctaTextRef = useRef(null)

  const activeTimeouts = useRef([])
  const dotsInterval = useRef(null)
  const hoverActive = useRef(false)
  const [ctaText, setCtaText] = useState('¡Hola, soy Verdi 👋!') // Texto inicial
  const [isOverlayVisible, setIsOverlayVisible] = useState(false) // Estado para mostrar el overlay

  // 📌 Función para limpiar los timeouts y detener animaciones
  const clearActiveTimeouts = () => {
    activeTimeouts.current.forEach(timeout => clearTimeout(timeout))
    activeTimeouts.current = []
    if (dotsInterval.current) {
      clearInterval(dotsInterval.current)
      dotsInterval.current = null
    }
  }

  // 📌 Animación de puntos ("Verdi está escribiendo...")
  const animateDots = () => {
    let dots = ''
    dotsInterval.current = setInterval(() => {
      dots = dots.length < 3 ? dots + '.' : ''
      setCtaText(dots)
    }, 500)
  }

  const toggleTextOverlay = () => {
    const textOverlay = textOverlayRef.current
    if (!textOverlay) return

    setIsOverlayVisible(true)
    animateDots()

    const timeout1 = setTimeout(() => {
      if (hoverActive.current) return
      textOverlay.style.opacity = '1'

      const timeout2 = setTimeout(() => {
        if (hoverActive.current) return
        clearInterval(dotsInterval.current)
        textOverlay.style.opacity = '0'

        const timeout3 = setTimeout(() => {
          if (hoverActive.current) return
          setCtaText('¡Hola, soy Verdi 👋!')
          textOverlay.style.opacity = '1'

          const timeout4 = setTimeout(() => {
            if (hoverActive.current) return
            textOverlay.style.opacity = '0'

            const timeout5 = setTimeout(() => {
              if (hoverActive.current) return
              setCtaText('¿Cómo puedo ayudarte?')
              textOverlay.style.opacity = '1'

              const timeout6 = setTimeout(() => {
                if (hoverActive.current) return
                textOverlay.style.opacity = '0'

                const timeout7 = setTimeout(() => {
                  if (hoverActive.current) return
                  textOverlay.style.display = 'none'
                  walinkButtonRef.current.classList.add(styles.active)
                  setIsOverlayVisible(false)
                }, 500)

                activeTimeouts.current.push(timeout7)
              }, 10000)

              activeTimeouts.current.push(timeout6)
            }, 1000)

            activeTimeouts.current.push(timeout5)
          }, 3000)

          activeTimeouts.current.push(timeout4)
        }, 1000)

        activeTimeouts.current.push(timeout3)
      }, 1000)

      activeTimeouts.current.push(timeout2)
    }, 5000)

    activeTimeouts.current.push(timeout1)
  }

  // 📌 Listeners para hover
  useEffect(() => {
    const walinkButton = walinkButtonRef.current
    const textOverlay = textOverlayRef.current

    if (!walinkButton || !textOverlay) return

    const handleMouseEnter = () => {
      clearActiveTimeouts()
      hoverActive.current = true
      setIsOverlayVisible(true)
      textOverlay.style.opacity = '0'
      setCtaText('¿Cómo puedo ayudarte?')

      const hoverTimeout = setTimeout(() => {
        if (!hoverActive.current) return
        textOverlay.style.opacity = '1'
      }, 100)

      activeTimeouts.current.push(hoverTimeout)
    }

    const handleMouseLeave = () => {
      hoverActive.current = false
      clearActiveTimeouts()
      textOverlay.style.opacity = '0'

      const leaveTimeout = setTimeout(() => {
        setIsOverlayVisible(false)
        walinkButton.classList.add(styles.active)
      }, 500)

      activeTimeouts.current.push(leaveTimeout)
    }

    walinkButton.addEventListener('mouseenter', handleMouseEnter)
    walinkButton.addEventListener('mouseleave', handleMouseLeave)

    // 🔹 Ejecutar la animación al inicio sin interrupciones
    toggleTextOverlay()

    return () => {
      walinkButton.removeEventListener('mouseenter', handleMouseEnter)
      walinkButton.removeEventListener('mouseleave', handleMouseLeave)
      clearActiveTimeouts()
      toggleTextOverlay()
    }
  }, [])

  return (
    <div ref={walinkButtonRef} className={styles.walinkButton}>
      <a target='_blank' href='https://wa.link/50xm9j'>
        <div
          ref={textOverlayRef}
          className={styles.textOverlay}
          style={{ display: isOverlayVisible ? 'inline-flex' : 'none' }} // Control de visibilidad
        >
          <span className={styles.arrow}></span>
          <span ref={ctaTextRef} className={styles.ctaText}>
            {ctaText}
          </span>
        </div>
        <img src='/VERDI/Verdi Button.png' alt='Verdi te envía un mensaje' />
      </a>
    </div>
  )
}
