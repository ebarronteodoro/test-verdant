'use client'

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "../styles/components/timeline.css";

export default function TimeLine({ param }) {
  const pathname = usePathname();

  useEffect(() => {
    let ascend_crono = true;

    function timelineMobile() {
      if (window.innerWidth <= 560) {
        if (ascend_crono) {
          const container = document.querySelector(".buildings_cards_container");
          if (container) {
            const cards = Array.from(
              container.querySelectorAll(".building_card")
            );

            // Reordenar las tarjetas
            cards.forEach((card) => container.removeChild(card));
            cards.reverse().forEach((card) => container.appendChild(card));

            // Mostrar solo los dos primeros y ocultar el resto
            cards.forEach((card, index) => {
              card.style.display = index < 2 ? "flex" : "none";
            });
          }
          ascend_crono = false;
        }
      } else {
        if (!ascend_crono) {
          const container = document.querySelector(".buildings_cards_container");
          if (container) {
            const cards = Array.from(
              container.querySelectorAll(".building_card")
            );
            cards.forEach((card) => container.removeChild(card));
            cards.reverse().forEach((card) => container.appendChild(card));

            cards.forEach((card) => {
              card.style.display = "flex";
            });
          }
          ascend_crono = true;
        }
      }
    }

    function verificarOverflow() {
      const elemento = document.querySelector(".top_section");
      if (!elemento) return;

      // Se asume un ancho fijo de 1200px
      let anchocaja = 1200;
      let tieneOverflow = anchocaja > elemento.clientWidth;

      let ancho_pantalla = document.documentElement.clientWidth;
      const next_button = document.querySelector(".next-button");
      const prev_button = document.querySelector(".prev-button");

      if (ancho_pantalla <= 560) {
        if (!elemento.classList.contains("no-bg")) {
          elemento.classList.add("no-bg");
          if(next_button) next_button.style.display = "none";
          if(prev_button) prev_button.style.display = "none";
        }
      } else {
        if (!tieneOverflow) {
          elemento.classList.add("no-bg");
          if(next_button) next_button.style.display = "none";
          if(prev_button) prev_button.style.display = "none";
        } else {
          elemento.classList.remove("no-bg");
          if(next_button) next_button.style.display = "flex";
          if(prev_button) prev_button.style.display = "flex";
        }
      }
    }

    function controlesScrollTimeline() {
      const prevButton = document.querySelector(".prev-button");
      const nextButton = document.querySelector(".next-button");
      const container = document.querySelector(".buildings_cards_container");

      function smoothScroll(element, direction, distance, duration) {
        const start = element.scrollLeft;
        const startTime = performance.now();

        function scrollStep(timestamp) {
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = progress * (2 - progress); // Efecto ease-out

          element.scrollLeft =
            direction === "right"
              ? start + distance * ease
              : start - distance * ease;

          if (progress < 1) {
            requestAnimationFrame(scrollStep);
          }
        }

        requestAnimationFrame(scrollStep);
      }

      if (prevButton && nextButton && container) {
        prevButton.addEventListener("click", () => {
          smoothScroll(container, "left", 220, 300);
        });

        nextButton.addEventListener("click", () => {
          smoothScroll(container, "right", 220, 300);
        });
      }
    }

    // Configuración del botón "Ver más"
    const seeMoreButton = document.getElementById("seemore");
    const handleSeeMore = () => {
      const container = document.querySelector(".buildings_cards_container");
      if (container) {
        const cards = Array.from(container.querySelectorAll(".building_card"));
        const hiddenCards = cards.some((card) => card.style.display === "none");

        if (hiddenCards) {
          cards.forEach((card) => (card.style.display = "block"));
          if (seeMoreButton && seeMoreButton.parentElement)
            seeMoreButton.parentElement.style.display = "none";
        }
      }
    };

    if (seeMoreButton) {
      seeMoreButton.addEventListener("click", handleSeeMore);
    }

    // Llamar funciones al cargar
    verificarOverflow();
    controlesScrollTimeline();
    timelineMobile();

    // Eventos de ventana
    window.addEventListener("resize", verificarOverflow);
    window.addEventListener("resize", timelineMobile);
    window.addEventListener("load", timelineMobile);

    return () => {
      window.removeEventListener("resize", verificarOverflow);
      window.removeEventListener("resize", timelineMobile);
      window.removeEventListener("load", timelineMobile);
      if (seeMoreButton) {
        seeMoreButton.removeEventListener("click", handleSeeMore);
      }
    };
  }, [pathname]);

  return (
    <>
      <div id="proyectos-entregados" className="clouds_container">
        <h2 className="projects_delivered-title">
          Proyectos <span>Entregados</span>
        </h2>
        <div className="clouds">
          <div className="cloud first">
            <Image width={200} height={78.69} src="/nube-1.png" alt="" />
          </div>
          <div className="cloud second">
            <Image width={150} height={59.02} src="/nube-1.png" alt="" />
          </div>
          <div className="cloud third">
            <Image width={100} height={50.36} src="/nube-2.png" alt="" />
          </div>
          <div className="cloud fourth">
            <Image width={300} height={151.11} src="/nube-2.png" alt="" />
          </div>
        </div>
      </div>
      <section className="timeline-container">
        <div className="top_section">
          <div className="buildings_cards_container">
            <div className="timeline"></div>
            <div className="building_card">
              <div className="building_data">
                <h6>La Gloria I</h6>
                <p>San Miguel</p>
                <span>2015</span>
              </div>
              <div className="dot_container">
                <span className="line first"></span>
                <span className="dot"></span>
              </div>
              <Image
                width={200}
                height={200}
                className="building_img"
                src="/lagloria1-nobg.png"
                alt="Gloria I"
              />
            </div>
            <div className="building_card">
              <div className="building_data">
                <h6>Paseo La Gloria</h6>
                <p>San Miguel</p>
                <span>2019</span>
              </div>
              <div className="dot_container">
                <span className="dot"></span>
              </div>
              <Image
                width={200}
                height={200}
                className="building_img"
                src="/paseolagloria-nobg.png"
                alt="Gloria I"
              />
            </div>
            <div className="building_card">
              <div className="building_data">
                <h6>La Gloria II</h6>
                <p>San Miguel</p>
                <span>2019</span>
              </div>
              <div className="dot_container">
                <span className="dot"></span>
              </div>
              <Image
                width={200}
                height={200}
                src="/lagloria2-nobg.png"
                alt="Gloria I"
              />
            </div>
            <div className="building_card">
              <div className="building_data">
                <h6>La Gloria III</h6>
                <p>San Miguel</p>
                <span>2020</span>
              </div>
              <div className="dot_container">
                <span className="dot"></span>
              </div>
              <Image
                width={200}
                height={200}
                className="building_img"
                src="/lagloria3-nobg.png"
                alt="Gloria I"
              />
            </div>
            <div className="building_card">
              <div className="building_data">
                <h6>La Gloria IV</h6>
                <p>San Miguel</p>
                <span>2022</span>
              </div>
              <div className="dot_container">
                <span className="line last"></span>
                <span className="dot"></span>
              </div>
              <Image
                width={200}
                height={200}
                className="building_img"
                src="/lagloria4-nobg.png"
                alt="Gloria I"
              />
            </div>
          </div>
          <div className="buildings_cards_button">
            {param === "proyectos" ? (
              <button id="seemore">Ver más</button>
            ) : (
              <a href="/venta-departamentos">Ver más</a>
            )}
          </div>

          <div className="prev-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"
            >
              <path d="M0 0h24v24H0z" stroke="none" />
              <path d="m15 6-6 6 6 6" />
            </svg>
          </div>
          <div className="next-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
            >
              <path d="M0 0h24v24H0z" stroke="none" />
              <path d="m9 6 6 6-6 6" />
            </svg>
          </div>
        </div>
        <div className="timeline_floor"></div>
      </section>
    </>
  );
}
