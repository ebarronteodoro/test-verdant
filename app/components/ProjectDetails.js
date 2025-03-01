'use client'

import Image from 'next/image'
import { useState } from 'react'
import '@justinribeiro/lite-youtube'

export default function ProjectDetails ({ project }) {
  const areaIcons = {
    'Área de juegos': '/common_areas/Área de juegos.png',
    Coworking: '/common_areas/Coworking.png',
    Gimnasio: '/common_areas/Gimnasio.png',
    Lavandería: '/common_areas/Lavandería.png',
    Lobby: '/common_areas/Lobby.png',
    'Lounge bar': '/common_areas/Lounge bar.png',
    'Parque interno': '/common_areas/Parque interno.png',
    'Pet zone': '/common_areas/Pet zone.png',
    Piscina: '/common_areas/Piscina.png',
    'Sala de estar de adultos': '/common_areas/Sala de estar de adultos.png',
    'Sala de estar': '/common_areas/Sala de estar.png',
    'Sala Sum': '/common_areas/Sala Sum.png',
    Terraza: '/common_areas/Terraza.png',
    'Zona de bicicletas': '/common_areas/Zona de bicicletas.png',
    'Zona de fogata': '/common_areas/Zona de fogata.png',
    'Zona de niños': '/common_areas/Zona de niños.png',
    'Zona de parrillas': '/common_areas/Zona de parrillas.png',
    'Zona gamer': '/common_areas/Zona gamer.png',
    'Zona zen': '/common_areas/Zona zen.png'
  }

  const areasByProject = {
    soil: [
      'Coworking',
      'Zona de niños',
      'Gimnasio',
      'Lavandería',
      'Lobby',
      'Lounge bar',
      'Sala de estar',
      'Sala Sum',
      'Terraza',
      'Zona de bicicletas',
      'Zona de parrillas'
    ],
    seed: [
      'Área de juegos',
      'Gimnasio',
      'Lobby',
      'Parque interno',
      'Pet zone',
      'Piscina',
      'Sala de estar de adultos',
      'Zona de bicicletas',
      'Zona de fogata',
      'Zona de niños',
      'Zona de parrillas',
      'Zona gamer',
      'Zona zen'
    ]
  }

  const areas = areasByProject[project.id] || []

  const videoUrls = {
    soil: 'vX_91uMnVE4',
    seed: 'PPyelFSB9_M',
    new_project: 'P0VlOIn2oSg'
  }

  const videoUrl = videoUrls[project.id] || videoUrls.new_project

  const [videoActive, setVideoActive] = useState(false)

  return (
    <>
      <section className='project-section'>
        <h2>
          Conoce el <span>proyecto</span>
        </h2>
        <div className='content'>
          <picture>
            <Image
              width={800}
              height={500}
              src={`/details/projects_details_${project.id}.png`}
              alt={`Fachada de ${project.title}`}
              priority
            />
          </picture>

          <div className='areas-container'>
            <span className='fw-bold'>{project.title}</span>
            <h3 className='fw-medium'>
              Áreas <span>comunes</span>
            </h3>
            <div className='areas'>
              {areas.map((area, index) => (
                <div key={index} className='areas-icon'>
                  <Image
                    width={60}
                    height={60}
                    src={areaIcons[area] || '/common_areas/default.png'}
                    alt={`Icono de ${area}`}
                    loading='lazy'
                  />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='options-container'>
          <div className='actions'>
            <h3>
              Desde <span>{project.price}</span>
            </h3>
            <button
              type='button'
              onClick={() => setVideoActive(true)}
              title='Ver video'
              className='button-video'
            >
              Ver video
            </button>
          </div>
          <button
            type='button'
            title='Descargar Brochure'
            className='download-brochure'
          >
            <svg
              width='34'
              height='36'
              viewBox='0 0 50 52'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M28.308 32.0306L40.9895 19.3466C40.9895 19.3466 40.9895 19.3466 40.9895 19.3466C41.4508 18.8854 42.0763 18.6262 42.7286 18.6262C43.3809 18.6262 44.0065 18.8854 44.4677 19.3466C44.929 19.8079 45.1881 20.4334 45.1881 21.0857C45.1881 21.738 44.929 22.3636 44.4677 22.8248L26.7416 40.551L26.741 40.5516C26.513 40.7804 26.242 40.962 25.9437 41.0858C25.6453 41.2097 25.3255 41.2735 25.0025 41.2735C24.6794 41.2735 24.3596 41.2097 24.0613 41.0858C23.7629 40.962 23.492 40.7804 23.264 40.5516L23.2633 40.551L5.53722 22.8273C5.53721 22.8273 5.5372 22.8273 5.53719 22.8273C5.07596 22.366 4.81685 21.7405 4.81685 21.0882C4.81685 20.4359 5.07597 19.8103 5.53722 19.3491C5.99846 18.8878 6.62404 18.6287 7.27633 18.6287C7.9286 18.6287 8.55414 18.8878 9.01538 19.349C9.0154 19.349 9.01543 19.3491 9.01545 19.3491L21.692 32.0306L22.5457 32.8845V31.6771V3.36451C22.5457 2.71358 22.8042 2.0893 23.2645 1.62902C23.7248 1.16874 24.3491 0.910156 25 0.910156C25.6509 0.910156 26.2752 1.16874 26.7355 1.62902C27.1958 2.0893 27.4544 2.71358 27.4544 3.36451V31.6771V32.8844L28.308 32.0306ZM1.59924 46.9292C2.05952 46.4689 2.68379 46.2103 3.33473 46.2103H46.6653C47.3162 46.2103 47.9405 46.4689 48.4008 46.9292C48.8611 47.3894 49.1196 48.0137 49.1196 48.6646C49.1196 49.3156 48.8611 49.9399 48.4008 50.4001C47.9405 50.8604 47.3162 51.119 46.6653 51.119H3.33473C2.68379 51.119 2.05952 50.8604 1.59924 50.4001C1.13895 49.9399 0.880371 49.3156 0.880371 48.6646C0.880371 48.0137 1.13895 47.3894 1.59924 46.9292Z'
                fill='#0E3F35'
                stroke='black'
              />
              t
            </svg>
            <span>Descargar Brochure</span>
          </button>
        </div>
      </section>

      <section className={`video-section ${videoActive ? 'active' : ''}`}>
        <div className='video-container'>
          <lite-youtube
            videoid={videoUrl}
            autoplay
            params='modestbranding=1&rel=0'
          ></lite-youtube>
        </div>
      </section>
    </>
  )
}
