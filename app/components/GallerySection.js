'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import Masonry from 'react-masonry-css'

const GallerySectionClient = ({ images }) => {
  const galleryRef = useRef(null)

  return (
    <section className='gallery-section p-4'>
      <h2 className='text-center text-2xl font-bold mb-4'>Nuestros espacios</h2>

      {/* Swiper de imágenes para pantallas grandes */}
      <div className='swipers mb-6'>
        <Swiper
          className='mySwiper'
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          loop
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <picture>
                <Image
                  src={image}
                  alt={`Imagen ${index + 1}`}
                  width={2000}
                  height={600}
                  loading='lazy'
                  className='rounded-lg shadow-md'
                />
                <h3 className='text-center mt-2'>{`Imagen ${index + 1}`}</h3>
              </picture>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Galería estilo Pinterest con Masonry para móvil */}
      <div
        id='gallery'
        className='justified-gallery md:hidden'
        ref={galleryRef}
      >
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
                alt={`Imagen ${index + 1}`}
                width={index % 5 === 0 ? 600 : 300} // Alternar entre 1 y 2 columnas
                height={index % 5 === 0 ? 5000 : 200}
                loading='lazy'
                className='w-full rounded-lg shadow-md hover:opacity-80 transition duration-300'
              />
            </div>
          ))}
        </Masonry>
      </div>
    </section>
  )
}

export default GallerySectionClient
