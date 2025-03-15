'use client'
import { useState, useEffect } from 'react'
import Script from 'next/script'
import '../styles/components/loadingOverlay.css'

export default function LoadingOverlay () {
  const [loading, setLoading] = useState(true)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    // Inicializar Lottie cuando esté disponible.
    const initLottie = () => {
      if (window.lottie) {
        window.lottie.loadAnimation({
          container: document.getElementById('lottie-logo'),
          renderer: 'svg',
          loop: false,
          autoplay: true,
          path: '/animations/Logo_Verdant.json'
        })
        window.lottie.setSpeed(2.5)
      }
    }

    // Iniciar la animación tras 50ms
    const lottieTimer = setTimeout(() => {
      initLottie()
    }, 50)

    // Activar el fade-out después de 1.5 segundos y quitar el overlay 300ms después.
    const timer1 = setTimeout(() => {
      setFade(true)
      const timer2 = setTimeout(() => {
        setLoading(false)
      }, 300)
      return () => clearTimeout(timer2)
    }, 1500)

    return () => {
      clearTimeout(lottieTimer)
      clearTimeout(timer1)
    }
  }, [])

  if (!loading) return null

  return (
    <>
      <Script
        src='https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js'
        strategy='beforeInteractive'
      />
      <div id='loader' className={`loader-container ${fade ? 'fade' : ''}`}>
        <div id='lottie-logo'></div>
        <div className='loading-bar-container'>
          <div className='loading-bar'></div>
        </div>
      </div>
    </>
  )
}
