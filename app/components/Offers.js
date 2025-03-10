"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import confetti from "canvas-confetti";
import Script from "next/script";
import "../styles/components/contactForm.css";

export default function Offers({ param }) {
  useEffect(() => {
    // SCRIPT CONTADOR
    const endDate = new Date("2025-06-01T23:59:59").getTime(); // Fecha final del countdown

    const Countdown = {
      $el: document.querySelector(".time-container"),

      init: function () {
        if (!this.$el) return;
        this.$ = {
          days: this.$el.querySelectorAll(".bloc-time.days .figure"),
          hours: this.$el.querySelectorAll(".bloc-time.hours .figure"),
          minutes: this.$el.querySelectorAll(".bloc-time.min .figure"),
          seconds: this.$el.querySelectorAll(".bloc-time.sec .figure"),
        };

        this.total_seconds = Math.floor((endDate - Date.now()) / 1000); // Calcula segundos restantes
        this.previous_values = {
          days: [null, null],
          hours: [null, null],
          minutes: [null, null],
          seconds: [null, null],
        };

        this.updateFigures(
          Math.floor(this.total_seconds / (3600 * 24)),
          this.$.days,
          this.previous_values.days
        );

        if (this.total_seconds > 0) {
          this.count();
        } else {
          console.error("La fecha final ya ha pasado.");
        }
      },

      count: function () {
        const that = this;
        this.countdown_interval = setInterval(function () {
          if (that.total_seconds > 0) {
            that.total_seconds--;

            const days = Math.floor(that.total_seconds / (3600 * 24));
            const hours = Math.floor((that.total_seconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((that.total_seconds % 3600) / 60);
            const seconds = that.total_seconds % 60;

            that.updateFigures(days, that.$.days, that.previous_values.days);
            that.updateFigures(hours, that.$.hours, that.previous_values.hours);
            that.updateFigures(
              minutes,
              that.$.minutes,
              that.previous_values.minutes
            );
            that.updateFigures(
              seconds,
              that.$.seconds,
              that.previous_values.seconds
            );
          } else {
            clearInterval(that.countdown_interval);
            console.log("¡El countdown ha terminado!");
          }
        }, 1000);
      },

      updateFigures: function (value, figures, previousValues) {
        const val_1 = Math.floor(value / 10); // Decena
        const val_2 = value % 10; // Unidad

        if (previousValues[0] !== val_1) {
          this.animateFigure(figures[0], val_1);
          previousValues[0] = val_1;
        }
        if (previousValues[1] !== val_2) {
          this.animateFigure(figures[1], val_2);
          previousValues[1] = val_2;
        }
      },

      animateFigure: function ($el, value) {
        const $top = $el.querySelector(".top");
        const $bottom = $el.querySelector(".bottom");
        const $back_top = $el.querySelector(".top-back span");
        const $back_bottom = $el.querySelector(".bottom-back span");

        $back_top.innerHTML = value;
        $back_bottom.innerHTML = value;

        gsap.to($top, {
          duration: 0.8,
          rotationX: "-180deg",
          transformPerspective: 300,
          ease: "quart.out",
          onComplete: function () {
            $top.innerHTML = value;
            $bottom.innerHTML = value;
            gsap.set($top, { rotationX: 0 });
          },
        });

        gsap.to($back_top.parentNode, {
          duration: 0.8,
          rotationX: "0deg",
          transformPerspective: 300,
          ease: "quart.out",
          clearProps: "all",
        });
      },
    };

    Countdown.init();

    // SCRIPT PICA PICA (Confetti)
    const ofertasSection = document.querySelector(".ofertas");

    function createCanvas() {
      const canvas = document.createElement("canvas");
      canvas.id = "my-canvas";
      canvas.style.position = "fixed";
      canvas.style.top = 0;
      canvas.style.left = 0;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.zIndex = 9999;
      canvas.style.pointerEvents = "none";
      document.body.appendChild(canvas);
      return canvas;
    }

    async function lanzarConfetti(canvas) {
      canvas.confetti =
        canvas.confetti || (await confetti.create(canvas, { resize: true }));

      // Lanzar confetti desde la izquierda
      canvas.confetti({
        particleCount: 250,
        spread: 90,
        startVelocity: 50,
        angle: 45,
        origin: { x: 0, y: 0.75 },
        colors: ["#007ADD", "#00ff00", "#ffffff"],
      });

      // Lanzar confetti desde la derecha
      canvas.confetti({
        particleCount: 250,
        spread: 90,
        startVelocity: 50,
        angle: 135,
        origin: { x: 1, y: 0.75 },
        colors: ["#007ADD", "#00ff00", "#ffffff"],
      });
    }

    const observerOptions = {
      root: null,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("La sección de ofertas está en el viewport");
          const canvas = document.getElementById("my-canvas") || createCanvas();
          lanzarConfetti(canvas);
        } else {
          console.log("La sección de ofertas ha salido del viewport");
        }
      });
    }, observerOptions);

    if (ofertasSection) {
      observer.observe(ofertasSection);
    }

    // Cleanup para el IntersectionObserver cuando se desmonte el componente
    return () => {
      if (ofertasSection) observer.unobserve(ofertasSection);
    };
  }, []);

  return (
    <>
      {/* <Script
        src="../libs/confetti.browser.min.js"
        strategy="beforeInteractive" // Carga antes de renderizar
      />
      <Script
        src="../libs/gsap.min.js"
        strategy="beforeInteractive" // Carga antes de renderizar
      /> */}
      <section className="ofertas">
        <div className="ofertas-container">
          <div className="ofertas-container__text">
            <h2>Promociones</h2>
            <p>Haz tuyo este beneficio antes de que se acabe, solo quedan:</p>
          </div>
          <div className="countdown">
            <div className="time-container">
              <div className="bloc-time days" data-init-value="0">
                <span className="count-title">Días</span>
                <div className="figure-container">
                  <div className="figure days days-1">
                    <span className="top">0</span>
                    <span className="top-back">
                      <span>0</span>
                    </span>
                    <span className="bottom">0</span>
                    <span className="bottom-back">
                      <span>0</span>
                    </span>
                  </div>
                  <div className="figure days days-2">
                    <span className="top">0</span>
                    <span className="top-back">
                      <span>0</span>
                    </span>
                    <span className="bottom">0</span>
                    <span className="bottom-back">
                      <span>0</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="bloc-time hours" data-init-value="24">
                <span className="count-title">Horas</span>
                <div className="figure-container">
                  <div className="figure hours hours-1">
                    <span className="top">2</span>
                    <span className="top-back">
                      <span>2</span>
                    </span>
                    <span className="bottom">2</span>
                    <span className="bottom-back">
                      <span>2</span>
                    </span>
                  </div>
                  <div className="figure hours hours-2">
                    <span className="top">4</span>
                    <span className="top-back">
                      <span>4</span>
                    </span>
                    <span className="bottom">4</span>
                    <span className="bottom-back">
                      <span>4</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="bloc-time min" data-init-value="0">
                <span className="count-title">Minutos</span>
                <div className="figure-container">
                  <div className="figure min min-1">
                    <span className="top">0</span>
                    <span className="top-back">
                      <span>0</span>
                    </span>
                    <span className="bottom">0</span>
                    <span className="bottom-back">
                      <span>0</span>
                    </span>
                  </div>
                  <div className="figure min min-2">
                    <span className="top">0</span>
                    <span className="top-back">
                      <span>0</span>
                    </span>
                    <span className="bottom">0</span>
                    <span className="bottom-back">
                      <span>0</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="bloc-time sec" data-init-value="0">
                <span className="count-title">Segundos</span>
                <div className="figure-container">
                  <div className="figure sec sec-1">
                    <span className="top">0</span>
                    <span className="top-back">
                      <span>0</span>
                    </span>
                    <span className="bottom">0</span>
                    <span className="bottom-back">
                      <span>0</span>
                    </span>
                  </div>
                  <div className="figure sec sec-2">
                    <span className="top">0</span>
                    <span className="top-back">
                      <span>0</span>
                    </span>
                    <span className="bottom">0</span>
                    <span className="bottom-back">
                      <span>0</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ofertas-proyectos">
          <div className="proyecto">
            <picture className="promocion">
              <source
                srcSet="/promociones/promocion.png"
                media="(min-width: 750px)"
              />
              <img
                className="promocion"
                loading="lazy"
                src="/promociones/PROMO II.png"
                alt="Proyecto Seed"
              />
            </picture>
            <Image
              className="laterales lateral_izq"
              src="/flecha-gris.png"
              alt="Flecha gris izquierda"
              width={50}
              height={50}
            />
            <Image
              className="laterales lateral_der"
              src="/flecha-gris.png"
              alt="Flecha gris derecha"
              width={50}
              height={50}
            />
          </div>
          <Link href="https://wa.link/h7wa2g" target="_blank">
            Saber más
          </Link>
          <Image
            src="/barra-hojas.png"
            alt="Barra hojas"
            width={200}
            height={100}
          />
        </div>
      </section>
    </>
  );
}
