'use client'

import Image from 'next/image'
import { useEffect } from 'react'

export default function CircularProgressSection() {
  useEffect(() => {
    const progressBars = document.querySelectorAll('.circular-progress')
    const colors = ['#b1e2de', '#e3efc6', '#e0eaf3']
    const targetValues = [500, 100000, 10]

    progressBars.forEach((bar, index) => {
      let progress = 0
      const targetProgress = 100 // % de progreso final
      const duration = 2000
      const startTime = performance.now()
      const indicator = bar.querySelector('.progress-indicator')
      const valueElement = bar.querySelector('.progress-value')
      const endValue = targetValues[index]
      let currentValue = 0

      function updateIndicator(progress) {
        const angle = (progress / 100) * 360
        const radius = bar.offsetWidth / 2 - 8 // Ajuste dinámico del radio
        const radians = (angle - 90) * (Math.PI / 180)
        const x = Math.cos(radians) * radius
        const y = Math.sin(radians) * radius
        indicator.style.transform = `translate(${x}px, ${y}px)`
      }

      function animate(time) {
        const elapsed = time - startTime
        progress = Math.min((elapsed / duration) * targetProgress, targetProgress)

        bar.style.background = `conic-gradient(${colors[index]} 0% ${progress}%, #dbdbdb ${progress}% 100%)`
        updateIndicator(progress)

        setTimeout(() => {
          indicator.style.top = 'unset'
        }, 30)

        if (progress < targetProgress) {
          requestAnimationFrame(animate)
        } else {
          updateIndicator(targetProgress)
        }
      }

      requestAnimationFrame(animate)

      function animateNumbers() {
        const increment = Math.ceil(endValue / (duration / 30))
        const interval = setInterval(() => {
          if (currentValue >= endValue) {
            clearInterval(interval)
            valueElement.innerHTML = `+${endValue.toLocaleString()}<br>${valueElement.innerHTML.split('<br>')[1]}`
          } else {
            currentValue += increment
            valueElement.innerHTML = `+${currentValue.toLocaleString()}<br>${valueElement.innerHTML.split('<br>')[1]}`
          }
        }, 30)
      }
      animateNumbers()

      function updateIndicatorPosition() {
        updateIndicator(progress)
      }

      window.removeEventListener('resize', updateIndicatorPosition)
      window.addEventListener('resize', updateIndicatorPosition)

      setTimeout(() => {
        updateIndicator(targetProgress)
      }, duration + 100)
    })
  }, [])

  return (
    <aside className='progress-bar__container'>
      <article className='circular-progress'>
        <figure className='progress-bar__content'>
          <Image width={100} height={100} src='/nosotros/family.png' alt='Icono de Familias' />
          <figcaption className='progress-value'>
            +0
            <br />
            familias
          </figcaption>
        </figure>
        <div className='progress-indicator'></div>
      </article>
      <article className='circular-progress'>
        <figure className='progress-bar__content'>
          <Image width={100} height={100} src='/nosotros/buildings.png' alt='Icono de Edificios Construidos' />
          <figcaption className='progress-value'>
            +000, 000 m<sup>2</sup>
            <br />
            Construidos
          </figcaption>
        </figure>
        <div className='progress-indicator'></div>
      </article>
      <article className='circular-progress'>
        <figure className='progress-bar__content'>
          <Image width={100} height={100} src='/nosotros/keys.png' alt='Icono de Llaves' />
          <figcaption className='progress-value'>
            +0
            <br />
            Proyectos Entregados
          </figcaption>
        </figure>
        <div className='progress-indicator'></div>
      </article>
    </aside>
  )
}