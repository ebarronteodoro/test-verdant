'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function NotificationSection() {
  useEffect(() => {
    const notificationButton = document.querySelector('.close-notification')

    if (notificationButton) {
      notificationButton.addEventListener('click', () => {
        const notification = document.querySelector('.title-section__sell-land')
        if (notification) {
          notification.style.display = 'none'
        }
      })
    }

    return () => {
      if (notificationButton) {
        notificationButton.removeEventListener('click', () => {
          const notification = document.querySelector('.title-section__sell-land')
          if (notification) {
            notification.style.display = 'none'
          }
        })
      }
    }
  }, [])

  return (
    <div className='title-section__sell-land' role='alert'>
      <h2>¿Interesado en vender tu terreno?</h2>
      <Link target='_blank' href='https://w.app/verdantinmobiliaria'>
        Contáctanos
      </Link>
      <button
        type='button'
        className='close-notification'
        aria-label='Cerrar notificación'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='icon icon-tabler icons-tabler-outline icon-tabler-x'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M18 6l-12 12' />
          <path d='M6 6l12 12' />
        </svg>
      </button>
    </div>
  )
}