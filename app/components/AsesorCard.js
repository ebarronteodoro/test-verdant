'use client'

import Image from 'next/image'
import Link from 'next/link'

export function AsesorCard ({
  imgSrc,
  alt,
  name,
  cargo,
  email,
  phone,
  whatsappLink
}) {
  return (
    <article className='article'>
      <picture>
        <Image
          loading='lazy'
          className='article-img'
          src={imgSrc}
          alt={alt}
          width={300} // Ajusta según tus necesidades
          height={300}
        />
      </picture>
      <div>
        <span className='name'>{name}</span>
        <span className='cargo'>{cargo}</span>
        <div className='email_container'>
          <Image
            loading='lazy'
            src='/icons/icon_mail.png'
            alt='Icono de Correo'
            width={24}
            height={24}
          />
          <span>{email}</span>
        </div>
        <div className='phone_container'>
          <Image
            loading='lazy'
            src='/icons/icon_phone.png'
            alt='Icono de Celular'
            width={24}
            height={24}
          />
          <span>{phone}</span>
        </div>
        <Link
          target='_blank'
          href={whatsappLink}
          className='asesor-contact-button'
          rel='noopener noreferrer'
        >
          Contactar
        </Link>
      </div>
    </article>
  )
}
