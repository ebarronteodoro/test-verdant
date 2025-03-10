"use client";

import { Navigation, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import Image from "next/image";
import "../styles/components/testimonialsSection.css";

export default function TestimonialsSection() {
  return (
    <section className="testimonial-section">
      <h2>
        <strong>Nuestros clientes</strong> dicen lo mejor
      </h2>
      <div className="testimonial-section__container">
        <Swiper
          modules={[Navigation, EffectCoverflow]}
          effect="coverflow"
          speed={400}
          initialSlide={0}
          autoHeight={false}
          direction="horizontal"
          slidesPerView={1}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".testimonial__button-prev",
          }}
          centeredSlides={true}
          slidesOffsetBefore={0}
          grabCursor={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 48,
            depth: 480,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            850: {
              slidesPerView: 2,
            },
          }}
          className="testimonial-section__swiper"
        >
          <SwiperSlide>
            <article className="testimonial-section__card">
              <header>
                <Image
                  src="/testimonials/testimonial_foto_1.png"
                  width={50}
                  height={50}
                  loading="lazy"
                  alt="Imagen de relleno"
                />
                <span>
                  <strong>Familia Lozano</strong>
                  Seed
                </span>
              </header>
              <p>
                "Estamos encantados con nuestra compra: ubicación ideal,
                acabados de calidad, excelentes áreas comunes y un servicio al
                cliente excepcional. ¡Totalmente recomendable!"
              </p>
            </article>
          </SwiperSlide>
          <SwiperSlide>
            <article className="testimonial-section__card">
              <header>
                <Image
                  src="/testimonials/testimonial_foto_2.png"
                  width={50}
                  height={50}
                  loading="lazy"
                  alt="Imagen de relleno"
                />
                <span>
                  <strong>Familia López</strong>
                  La Gloria I
                </span>
              </header>
              <p>
                "Ya pasaron cinco años desde que me mudé a mi hogar. La
                experiencia que he tenido en la compra hasta el momento ha sido
                satisfactoria."
              </p>
            </article>
          </SwiperSlide>
          <SwiperSlide>
            <article className="testimonial-section__card">
              <header>
                <Image
                  src="/testimonials/testimonial_foto_1.png"
                  width={50}
                  height={50}
                  loading="lazy"
                  alt="Imagen de relleno"
                />
                <span>
                  <strong>Familia Lozano</strong>
                  Seed
                </span>
              </header>
              <p>
                "Estamos encantados con nuestra compra: ubicación ideal,
                acabados de calidad, excelentes áreas comunes y un servicio al
                cliente excepcional. ¡Totalmente recomendable!"
              </p>
            </article>
          </SwiperSlide>
          <SwiperSlide>
            <article className="testimonial-section__card">
              <header>
                <Image
                  src="/testimonials/testimonial_foto_2.png"
                  width={50}
                  height={50}
                  loading="lazy"
                  alt="Imagen de relleno"
                />
                <span>
                  <strong>Familia López</strong>
                  La Gloria I
                </span>
              </header>
              <p>
                "Ya pasaron cinco años desde que me mudé a mi hogar. La
                experiencia que he tenido en la compra hasta el momento ha sido
                satisfactoria."
              </p>
            </article>
          </SwiperSlide>
        </Swiper>
        <div className="swiper-button-next testimonial__button-next"></div>
        <div className="swiper-button-prev testimonial__button-prev"></div>
        <Image
          src="/leaf-1.png"
          className="leaf-testimonial leaf-1"
          width={65}
          height={38.13}
          alt="hoja"
        />
        <Image
          src="/leaf-2.png"
          className="leaf-testimonial leaf-2"
          width={65}
          height={68.34}
          alt="hoja"
        />
        <Image
          src="/leaf-3.png"
          className="leaf-testimonial leaf-3"
          width={88}
          height={84.63}
          alt="hoja"
        />
        <Image
          src="/leaf-4.png"
          className="leaf-testimonial leaf-4"
          width={64}
          height={55.08}
          alt="hoja"
        />
        <Image
          src="/leaf-5.png"
          className="leaf-testimonial leaf-5"
          width={75}
          height={110.75}
          alt="hoja"
        />
        <Image
          src="/leaf-6.png"
          className="leaf-testimonial leaf-6"
          width={69}
          height={78.91}
          alt="hoja"
        />
        <Image
          src="/leaf-7.png"
          className="leaf-testimonial leaf-7"
          width={59}
          height={75.52}
          alt="hoja"
        />
      </div>
    </section>
  );
}
