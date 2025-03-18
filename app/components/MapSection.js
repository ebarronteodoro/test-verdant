'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Script from 'next/script'

import '../styles/components/mapSection.css'
import '../styles/lib/api-tomtom/maps.css'

export default function MapSection ({ tomtom_apikey }) {
  const pathname = usePathname()

  useEffect(() => {
    function mapa () {
      if (typeof tt !== 'undefined') {
        try {

          const apiKey = '302A7dGt1V6VAOSYg7ERJX2hcMqosebt'
          let zoom_number = window.innerWidth < 700 ? 10 : 11

          const map = tt.map({
            key: apiKey,
            container: 'map',
            style:
              'https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBAWVo1NG5nejJlUEd3RmZkRDtjNWNkM2E5My1lNGIwLTQ1NDItYTM1OS1iZTc5YTgzYWE3NDE=/drafts/0.json?key=' +
              apiKey,
            center: [-77.01542323246234, -12.084026483790424],
            zoom: zoom_number
          })

          let activePopup = null

          const addCustomMarker = (lngLat, popupContent) => {
            const customMarker = document.createElement('div')
            const markerImg = document.createElement('img')
            markerImg.src = '/ubicacion.png'
            markerImg.width = '40'
            markerImg.height = '60'
            markerImg.style.width = '40px'
            markerImg.style.height = 'auto'
            markerImg.alt = 'Icono de ubicación'
            customMarker.appendChild(markerImg)

            const marker = new tt.Marker({ element: customMarker })
              .setLngLat(lngLat)
              .addTo(map)

            const popup = new tt.Popup({
              offset: [0, -50],
              closeButton: false,
              closeOnClick: false,
              className: 'custom-popup'
            }).setHTML(popupContent)

            const showPopup = event => {
              event.stopPropagation()
              if (activePopup) activePopup.remove()
              popup.setLngLat(lngLat).addTo(map)
              activePopup = popup
            }

            customMarker.addEventListener('click', showPopup)
            customMarker.addEventListener('mouseenter', showPopup)
          }

          // Agregar marcadores
          addCustomMarker(
            [-77.06574191135122, -12.08378394649858],
            `
              <a href="/venta-departamentos/pueblo-libre-soil" class="popup-content">
                <span class="location">PUEBLO LIBRE</span>
                <span class="status">EN CONSTRUCCIÓN</span>
                <Image width={230} height={290} src="/soil-project.png" alt="Edificio Soil" />
                <div>
                  <span class="name">SOIL</span>
                  <div class="address"><Image width={13} height={16} src="/icons/location-icon.png" alt="Location Icon /"><span>Av. La Marina 425</span></div>
                </div>
              </a>
            `
          )

          addCustomMarker(
            [-76.97895792825048, -12.083051505807905],
            `
              <a href="/venta-departamentos/surco-seed" class="popup-content">
                <span class="location">SURCO</span>
                <span class="status">ENTREGA INMEDIATA</span>
                <Image width={230} height={290} src="/seed-project.png" alt="Edificio Seed" />
                <div>
                  <span class="name">SEED</span>
                  <div class="address"><Image width={13} height={16} src="/icons/location-icon.png" alt="Location Icon" /><span>Jr. República de Líbano 1735</span></div>
                </div>
              </a>
            `
          )

          // Ajuste del mapa al redimensionar la ventana
          const onResize = () => {
            map.resize()
            removeAttribution()
          }
          window.addEventListener('resize', onResize)

          // Función para remover el link de atribución de TomTom
          const removeAttribution = () => {
            const attributionLink = document.querySelector(
              'a.tomtomAttribution'
            )
            if (attributionLink) {
              // Asignar rel="nofollow" antes de eliminarlo
              attributionLink.setAttribute('rel', 'nofollow')
              attributionLink.remove()
            }
          }
          // Ejecuta la remoción pasados 2 segundos
          const attributionTimeout = setTimeout(removeAttribution, 2000)

          // Ejemplo de listener de otro elemento
          const layerEl = document.querySelector('.layer_back')
          const removeLayerListener = () => {
            layerEl.classList.remove('layer_back')
            const layerBackP = document.querySelector('.layer_back_p')
            if (layerBackP) layerBackP.style.display = 'none'
          }
          if (layerEl) {
            layerEl.addEventListener('click', removeLayerListener)
          }

          // Devuelve función de limpieza para remover listeners y destruir el mapa
          return () => {
            window.removeEventListener('resize', onResize)
            clearTimeout(attributionTimeout)
            if (layerEl)
              layerEl.removeEventListener('click', removeLayerListener)
            if (map) map.remove()
          }
        } catch (error) {
          console.error('Error al inicializar el mapa:', error)
        }
      }
    }

    const cleanupMap = mapa()

    return () => {
      if (cleanupMap) cleanupMap()
    }
  }, [pathname])

  return (
    <>
      <Script src='/libs/maps-web.min.js' strategy='beforeInteractive' />
      <section className='map-section'>
        <div className='map-section__container'>
          <div className='map-data'>
            <span>PROYECTOS</span>
            <h2>
              Descubre el proyecto <span>perfecto para ti</span>
            </h2>
            <a href='/venta-departamentos'>Ver Proyectos</a>
          </div>
          <div className='map-container'>
            <div id='map' className='layer_back'>
              <p className='layer_back_p'>¡Haz click aquí para ver el mapa!</p>
            </div>
          </div>
        </div>
        <picture>
          <Image
            src='/barra-hojas.png'
            alt='Barra hojas'
            width={500}
            height={50}
          />
        </picture>
      </section>
    </>
  )
}
