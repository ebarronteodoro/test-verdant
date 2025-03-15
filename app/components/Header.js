'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import '../styles/components/header.css'
import { usePathname } from 'next/navigation'

const poppinsSans = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-poppins'
})

export default function Header () {
  const pathname = usePathname()

  // Control del menú responsive
  useEffect(() => {
    const menuLogo = document.querySelector('.menu-logo-container')
    const navLinks = document.querySelector('.nav')

    const handleMenuClick = event => {
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

  // Funcionalidad de scroll hacia la sección "cotiza"
  useEffect(() => {
    function scrollToSection (updateURL = true) {
      const section = document.getElementById('cotiza')
      if (section) {
        const offset = 80
        const sectionPosition =
          section.getBoundingClientRect().top + window.scrollY - offset

        window.scrollTo({
          top: sectionPosition,
          behavior: 'smooth'
        })

        // Actualizar la URL con "#cotiza" si se activa desde el botón
        if (updateURL) {
          history.pushState(null, null, '#cotiza')
        }
      }
    }

    // Verifica si la URL ya contiene "#cotiza" al cargar la página
    if (window.location.hash === '#cotiza') {
      setTimeout(() => scrollToSection(false), 1000)
    }

    const btnCotizar = document.getElementById('btn-cotizar')
    const handleBtnCotizarClick = e => {
      e.preventDefault()
      scrollToSection()
    }

    if (btnCotizar) {
      btnCotizar.addEventListener('click', handleBtnCotizarClick)
    }

    return () => {
      if (btnCotizar) {
        btnCotizar.removeEventListener('click', handleBtnCotizarClick)
      }
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
        <div className='right-section'>
          {pathname.startsWith('/venta-departamentos/') && (
            <Link className='btn-cotizar' href='#cotiza' id='btn-cotizar'>
              Cotiza tu depa
            </Link>
          )}
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
                <Link href='/venta-departamentos' className='nav-link-button'>
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
      </div>
    </header>
  )
}
