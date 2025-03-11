'use client'

import { AsesorCard } from './AsesorCard' // Asegúrate de ajustar la ruta según tu estructura

export default function AsesoresSection ({ project }) {
  return (
    <section className='asesores-section'>
      <h2 className='fw-semibold'>
        Contacta con un <span>asesor</span>
      </h2>
      <div className='asesores-article__container'>
        {project.id === 'soil' && (
          <>
            <AsesorCard
              imgSrc='/asesores/ASESORES SOIL/Rodrigo-Miranda.jpg'
              alt='Asesor Rodrigo Miranda'
              name='Rodrigo Miranda'
              cargo='Asesor de Ventas'
              email='ventas.soil@verdant.pe'
              phone='+51 982 172 656'
              whatsappLink='https://wa.link/y2khg7'
            />
            <AsesorCard
              imgSrc='/asesores/GROW/ROBERT-ARROYO.png'
              alt='Asesor Robert Arroyo'
              name='Robert Arroyo'
              cargo='Asesor Digital'
              email='ventas2.soil@verdant.pe'
              phone='+51 943 373 397'
              whatsappLink='https://wa.link/jby2oq'
            />
            <AsesorCard
              imgSrc='/asesores/ASESORES SOIL/KELLY.png'
              alt='Asesora Kelly Atoche'
              name='Kelly Atoche'
              cargo='Asesor Digital'
              email='ventas.digital@verdant.pe'
              phone='+51 982 145 819'
              whatsappLink='https://wa.link/36p1v3'
            />
          </>
        )}
        {project.id === 'seed' && (
          <>
            <AsesorCard
              imgSrc='/asesores/ASESORES SEED/César Chumán - Asesor SEED (editado).png'
              alt='Asesor César Chumán'
              name='Cesar Chuman'
              cargo='Asesor de Ventas'
              email='ventas@verdant.pe'
              phone='+51 914 267 460'
              whatsappLink='https://wa.link/4xp1gv'
            />
            <AsesorCard
              imgSrc='/asesores/ASESORES SEED/Anthony Reyna - Asesor SEED (editado)1.png'
              alt='Asesor Anthony Reyna'
              name='Anthony Reyna'
              cargo='Asesor Digital'
              email='ventas.seed@verdant.pe'
              phone='+51 993 725 811'
              whatsappLink='https://wa.link/eepaej'
            />
          </>
        )}
      </div>
    </section>
  )
}
