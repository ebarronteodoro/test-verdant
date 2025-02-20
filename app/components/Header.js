'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import '../styles/components/header.css'

const poppinsSans = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700']
})

export default function Header () {
  useEffect(() => {
    const menuLogo = document.querySelector('.menu-logo-container')
    const navLinks = document.querySelector('.nav')

    const handleMenuClick = (event) => {
      console.log('click')
      console.log(window.getComputedStyle(navLinks).display)

      event.preventDefault()
      if (window.getComputedStyle(navLinks).display === 'none') {
        navLinks.style.display = 'block'
      } else {
        navLinks.style.display = 'none'
      }
    }

    menuLogo.addEventListener('click', handleMenuClick)

    return () => {
      menuLogo.removeEventListener('click', handleMenuClick)
    }
  }, [])

  return (
    <header className={`header ${poppinsSans.className}`}>
      <div className='nav-container'>
        <Link href='/' className='logo-container'>
          <picture>
            <source srcSet='/header/verdant.png' media='(min-width: 764px)' />
            <Image
              src='/header/verdant-logo.png'
              width={39}
              height={41}
              alt='Logo Verdant'
              priority
            />
          </picture>
        </Link>
        <div className='menu-logo-container'>
          <Image
            src='/header/menu.png'
            alt='Menú Logo'
            className='menu-logo'
            width={57}
            height={57}
          />
        </div>
        <nav className='nav'>
          <ul className='nav-links'>
            <li>
              <Link href='/nosotros' className='nav-link-button'>
                Nosotros
              </Link>
            </li>
            <li>
              <Link href='/proyectos' className='nav-link-button clickable'>
                Proyectos
              </Link>
            </li>
            <li>
              <Link href='/refiere' className='nav-link-button'>
                Refiere y Gana
              </Link>
            </li>
            {/* <li><Link href="/novedades" className="nav-link-button">Novedades</Link></li> */}
          </ul>
        </nav>
      </div>
    </header>
  )
}
