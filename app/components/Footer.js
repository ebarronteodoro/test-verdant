import Link from 'next/link'
import '../styles/components/footer.css'
import Image from 'next/image'

export default function Footer () {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <div className='footer__section footer__branding'>
          <Image
            width={260}
            height={60}
            src='/footer/verdant.png'
            alt='Verdant Logo'
            className='footer__logo'
          />
          <address className='footer__address'>
            Calle Martin de Murua 150
            <br />
            San Miguel, Lima - Perú
          </address>
          <div className='footer__logos'>
            <Image
              width={150}
              height={80}
              src='/footer/asei-footer.png'
              alt='Logo ASEI'
              className='footer__logo-partner'
            />
            <Image
              width={150}
              height={80}
              src='/footer/vivienda-footer.webp'
              alt='Logo Verde'
              className='footer__logo-partner'
            />
            <Image
              width={150}
              height={80}
              src='/footer/edge-footer.png'
              alt='Logo Edge'
              className='footer__logo-partner'
            />
          </div>
        </div>

        <div className='footer__section footer__contact'>
          <h3 className='footer__title'>Canales de contacto</h3>
          <div className='footer__contact-form'>
            <Link href='/contacto'>Formulario de contacto</Link>
            <Link target='_blank' href='https://wa.link/ahpgbx'>
              ¿Interesado en vender tu terreno?
            </Link>
          </div>
        </div>

        <div className='footer__section footer__about'>
          <h3 className='footer__title'>Nosotros</h3>
          <ul className='footer__list'>
            <li className='footer__list-item'>
              <Link href='/venta-departamentos'>Proyectos</Link>
            </li>
            <li className='footer__list-item'>
              <Link href='/refiere'>Refiere y gana</Link>
            </li>
            {/* <li className="footer__list-item"><Link href="novedades">Novedades</Link></li> */}
          </ul>
        </div>

        <div className='footer__section footer__legal'>
          <h3 className='footer__title'>Legal</h3>
          <ul className='footer__list'>
            <li className='footer__list-item'>
              <Link href='#'>Política de privacidad</Link>
            </li>
            <li className='footer__list-item'>
              <Link href='#'>Libro de reclamaciones</Link>
            </li>
          </ul>
        </div>

        <div className='footer__section footer__social'>
          <ul className='footer__social-list'>
            <li className='footer__social-item'>
              <Link
                href='https://www.linkedin.com/company/verdant-inmobiliaria/'
                target='_blank'
                className='footer__social-link'
                aria-label='Linkedin'
              >
                <Image
                  width={51}
                  height={51}
                  src='/footer/social_red_linkedin.png'
                  alt='Linkedin'
                  className='footer__social-icon'
                />
              </Link>
            </li>
            <li className='footer__social-item'>
              <Link
                href='https://beacons.ai/verdant.pe'
                target='_blank'
                className='footer__social-link'
                aria-label='TikTok'
              >
                <Image
                  width={51}
                  height={51}
                  src='/footer/social_red_tiktok.png'
                  alt='TikTok'
                  className='footer__social-icon'
                />
              </Link>
            </li>
            <li className='footer__social-item'>
              <Link
                href='https://beacons.ai/verdant.pe'
                target='_blank'
                className='footer__social-link'
                aria-label='Instagram'
              >
                {/* <Image
                  width={51}
                  height={51}
                  src='/footer/instagram.png'
                  alt='Botón de Instagram'
                  className='footer__social-icon'
                /> */}
                <svg
                  className='footer__social-icon'
                  fill='none'
                  stroke='#033f35'
                  strokeLinecap='round'
                  strokeWidth='2'
                  strokeLinejoin='round'
                  viewBox='0 0 24 24'
                >
                  <path stroke='none' d='M0 0h24v24H0z' />
                  <path d='M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z' />
                  <path d='M9 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0M16.5 7.5v.01' />
                </svg>
              </Link>
            </li>
            <li className='footer__social-item'>
              <Link
                href='https://beacons.ai/verdant.pe'
                target='_blank'
                className='footer__social-link'
                aria-label='Facebook'
              >
                <Image
                  width={51}
                  height={51}
                  src='/footer/social_red_facebook.png'
                  alt='Facebook'
                  className='footer__social-icon'
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
