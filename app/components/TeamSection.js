'use client'

import { useEffect, useState } from 'react'
import TeamCard from './TeamCard'
import Image from 'next/image'

const teamMembers = [
  {
    name: 'Jose Vidaurre',
    position: 'Gerente General',
    image: '/verdant-team/vidaurre.png'
  },
  {
    name: 'Marco Gomero',
    position: 'Gerencia de Operaciones',
    image: '/verdant-team/gomero.png'
  },
  {
    name: 'Jussef Liban',
    position: 'Presidente Ejecutivo',
    image: '/verdant-team/j_liban.png'
  },
  {
    name: 'Nayib Liban',
    position: 'Gerente Comercial',
    image: '/verdant-team/liban.png'
  },
  {
    name: 'Steffano Chang',
    position: 'Nuevos Negocios',
    image: '/verdant-team/chang.png'
  },
  {
    name: 'Shela Gonzalez',
    position: 'Contadora General',
    image: '/verdant-team/gonzales.png'
  }
]

export default function TeamSection () {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const seeMoreBtn = document.getElementById('see-more')

    if (!seeMoreBtn) return

    const toggleExpanded = () => {
      setExpanded(prev => !prev)
    }

    seeMoreBtn.addEventListener('click', toggleExpanded)

    return () => {
      seeMoreBtn.removeEventListener('click', toggleExpanded)
    }
  }, [])

  useEffect(() => {
    const cards = document.querySelectorAll('.team-card')

    cards.forEach((card, index) => {
      if (index < 3) {
        card.style.display = 'flex'
        setTimeout(() => card.classList.add('visible'), 10)
      } else {
        card.style.display = 'none'
      }
    })
  }, [])

  useEffect(() => {
    const cards = document.querySelectorAll('.team-card')

    if (expanded) {
      cards.forEach(card => {
        card.style.display = 'flex'
        setTimeout(() => card.classList.add('visible'), 50)
      })
    } else {
      cards.forEach((card, index) => {
        if (index >= 3) {
          card.classList.remove('visible')
          setTimeout(() => {
            card.style.display = 'none'
          }, 500)
        }
      })
    }
  }, [expanded])

  return (
    <section className='team-section'>
      <Image width={150} height={300} src='/flecha-gris.png' alt='Flecha guía' />
      <h3>
        Estamos para <mark>ofrecerte lo mejor</mark>
      </h3>

      <div className='cards-container'>
        {teamMembers?.map((member, index) => (
          <TeamCard key={index} {...member} />
        ))}
      </div>

      <div className='see-more__container'>
        <button id='see-more' className={expanded ? 'expanded' : ''}>
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
      </div>
    </section>
  )
}
