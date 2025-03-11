'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function LocationSection ({
  iframe,
  ubicacion,
  sala_ventas,
  horario,
  gmaps_link,
  waze_link
}) {
  return (
    <section className='location-section'>
      <div className='location-container'>
        <div
          className='iframe-container'
          dangerouslySetInnerHTML={{
            __html: `${iframe}
            <Image
            width={100}
            height={100}
            class='leafs-aquamarine'
            src='/leafs-aquamarine.png'
            alt='Hojas de adorno para el mapa'
          />`
          }}
        />
        <div className='info-container'>
          <h2>Ubicación</h2>
          <span>
            <img
              src='/icons/icon-green-location.svg'
              alt='Icono de ubicación'
            />
            {ubicacion}
          </span>
          <span className='sala-ventas'>
            <strong>Sala de ventas</strong>
            {sala_ventas}
          </span>
          <span className='horario'>
            <strong>Horario de atención</strong>
            {horario}
          </span>
          <div className='buttons-container'>
            <Link href={gmaps_link} target='_blank' rel='noopener noreferrer'>
              <img src='/icons/gmaps-icon.svg' alt='Icono Google Maps' />
            </Link>
            <Link href={waze_link} target='_blank' rel='noopener noreferrer'>
              <img src='/icons/waze-icon.svg' alt='Icono Waze' />
            </Link>
          </div>
          <img
            className='location-green-leaf'
            src='/location-green-leaf.png'
            alt='Hojas verdes de adorno'
          />
        </div>
      </div>
    </section>
  )
}
