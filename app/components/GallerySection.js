'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import lightGallery from 'lightgallery'
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-fullscreen.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const GallerySection = ({ images }) => {
  const galleryRef = useRef(null)

  useEffect(() => {
    if (galleryRef.current) {
      lightGallery(galleryRef.current, {
        thumbnail: true,
        zoom: true,
        fullScreen: true
      })
    }
  }, [images])

  return (
    <section className='gallery-section'>
      <h2>Nuestros espacios</h2>

      <div className='swipers'>
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
                  alt={`Imagen ${image.split('/').pop().split('.')[0]}`}
                  width={2000}
                  height={600}
                  loading='lazy'
                />
                <h3>{image.split('/').pop().split('.')[0]}</h3>
              </picture>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div id='gallery' className='justified-gallery' ref={galleryRef}>
        {images.map((image, index) => (
          <a href={image} key={index} className='gallery-item'>
            <Image
              src={image}
              alt={`Imagen ${index + 1}`}
              width={150}
              height={100}
              loading='lazy'
            />
          </a>
        ))}
      </div>
    </section>
  )
}

export default GallerySection
