'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Navigation,
  EffectCoverflow,
  Thumbs,
  Autoplay,
  FreeMode
} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'
import 'swiper/css/thumbs'
import 'swiper/css/free-mode'
import Masonry from 'react-masonry-css'
import path from 'path'

const GallerySectionClient = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  const getImageName = imagePath => {
    return path.parse(imagePath).name
  }

  return (
    <section className='gallery-section'>
      <h2>Nuestros espacios</h2>

      {/* Swiper de imágenes para pantallas grandes */}
      <div className='swipers'>
        <Swiper
          className='mySwiper'
          modules={[Navigation, EffectCoverflow, Thumbs, Autoplay]}
          effect={'coverflow'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }}
          autoplay={{ delay: 100000, disableOnInteraction: false }}
          loop
          spaceBetween={10}
          // Ajustamos loopedSlides directamente en el callback onSwiper
          thumbs={{ swiper: thumbsSwiper }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <picture>
                <Image
                  src={image}
                  alt={`Imagen de {getImageName(image).replace(/_/g, ' ')}`}
                  width={1500}
                  height={600}
                  loading='lazy'
                />
                <h3>{getImageName(image).replace(/_/g, ' ')}</h3>
              </picture>
            </SwiperSlide>
          ))}
          {/* Botones de navegación */}
          <div className='swiper-button-prev'></div>
          <div className='swiper-button-next'></div>
        </Swiper>
        <Swiper
          className='mySwiper2'
          modules={[FreeMode, Thumbs]}
          spaceBetween={15}
          slidesPerView={5}
          freeMode
          watchSlidesProgress
          loop
          onSwiper={setThumbsSwiper}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={image}
                alt={`Miniatura de ${getImageName(image).replace(/_/g, ' ')}`}
                width={300}
                height={120}
                loading='lazy'
              />
              <h3>{getImageName(image).replace(/_/g, ' ')}</h3>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Swiper de miniaturas */}
      <div className='thumbs-swiper'></div>

      {/* Galería estilo Pinterest con Masonry para móvil */}
      <div id='gallery' className='justified-gallery'>
        <Masonry
          breakpointCols={2} // Siempre 2 columnas en móvil
          className='masonry-grid'
          columnClassName='masonry-column'
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`gallery-item ${
                index % 5 === 0 ? 'single-column' : ''
              }`}
            >
              <Image
                src={image}
                alt={`Imagen de ${getImageName(image).replace(/_/g, ' ')}`}
                width={index % 5 === 0 ? 600 : 300}
                height={index % 5 === 0 ? 5000 : 200}
                loading='lazy'
              />
              <h3>{getImageName(image).replace(/_/g, ' ')}</h3>
            </div>
          ))}
        </Masonry>
      </div>
    </section>
  )
}

export default GallerySectionClient
