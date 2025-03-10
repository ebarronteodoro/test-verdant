"use client";

import { useEffect } from "react";
import Image from "next/image";
import Script from "next/script";

import "../styles/components/mapSection.css";
import "../styles/lib/api-tomtom/maps.css";

export default function MapSection() {
  useEffect(() => {
    function mapa() {
      if (typeof tt !== "undefined") {
        try {
          const apiKey = "302A7dGt1V6VAOSYg7ERJX2hcMqosebt";
          let zoom_number = window.innerWidth < 700 ? 10 : 11;

          let map = tt.map({
            key: apiKey,
            container: "map",
            style:
              "https://api.tomtom.com/style/2/custom/style/dG9tdG9tQEBAWVo1NG5nejJlUEd3RmZkRDtjNWNkM2E5My1lNGIwLTQ1NDItYTM1OS1iZTc5YTgzYWE3NDE=/drafts/0.json?key=" +
              apiKey,
            center: [-77.01542323246234, -12.084026483790424],
            zoom: zoom_number,
          });

          let activePopup = null;
          let isMouseDown = false;

          const addCustomMarker = (lngLat, popupContent) => {
            let customMarker = document.createElement("div");
            let markerImg = document.createElement("img");
            markerImg.src = "../ubicacion.png";
            markerImg.style.width = "40px";
            markerImg.style.height = "auto";
            customMarker.appendChild(markerImg);

            let marker = new tt.Marker({ element: customMarker })
              .setLngLat(lngLat)
              .addTo(map);

            let popup = new tt.Popup({
              offset: [0, -50],
              closeButton: false,
              closeOnClick: false,
              className: "custom-popup",
            }).setHTML(popupContent);

            customMarker.addEventListener("click", (event) => {
              event.stopPropagation();
              if (activePopup) activePopup.remove();
              if (popup !== activePopup) {
                popup.setLngLat(lngLat).addTo(map);
                activePopup = popup;
              }
            });

            customMarker.addEventListener("mouseenter", (event) => {
              event.stopPropagation();
              if (activePopup) activePopup.remove();
              if (popup !== activePopup) {
                popup.setLngLat(lngLat).addTo(map);
                activePopup = popup;
              }
            });
          };

          addCustomMarker(
            [-77.06574191135122, -12.08378394649858],
            `
              <a href="/proyecto-soil" class="popup-content">
                <span class="location">PUEBLO LIBRE</span>
                <span class="status">EN CONSTRUCCIÓN</span>
                <img src="../soil-project.png" alt="Edificio Soil" />
                <div>
                  <span class="name">SOIL</span>
                  <div class="address"><img src="../location-icon.png" alt="Location Icon"><span>Av. La Marina 425</span></div>
                </div>
              </a>
            `
          );

          addCustomMarker(
            [-76.97895792825048, -12.083051505807905],
            `
              <a href="/proyecto-seed" class="popup-content">
                <span class="location">SURCO</span>
                <span class="status">ENTREGA INMEDIATA</span>
                <img src="../seed-project.png" alt="Edificio Seed" />
                <div>
                  <span class="name">SEED</span>
                  <div class="address"><img src="../location-icon.png" alt="Location Icon"><span>Jr. República de Líbano 1735</span></div>
                </div>
              </a>
            `
          );

          window.addEventListener("resize", () => map.resize());

          document
            .querySelector(".layer_back")
            .addEventListener("click", function () {
              this.classList.remove("layer_back");
              document.querySelector(".layer_back_p").style.display = "none";
            });
        } catch (error) {
          console.error("Error al inicializar el mapa:", error);
        }
      }
    }

    document.addEventListener("DOMContentLoaded", mapa());
  }, []);

  return (
    <>
      <Script
        src="../libs/maps-web.min.js"
        strategy="beforeInteractive" // Carga antes de renderizar
      />
      <section className="map-section">
        <div className="map-section__container">
          <div className="map-data">
            <span>PROYECTOS</span>
            <h2>
              Descubre el proyecto <span>perfecto para ti</span>
            </h2>
            <a href="proyectos">Ver Proyectos</a>
          </div>
          <div className="map-container">
            <div id="map" className="layer_back">
              <p className="layer_back_p">¡Haz click aquí para ver el mapa!</p>
            </div>
          </div>
        </div>
        <picture>
          <Image
            src="/barra-hojas.png"
            alt="Barra hojas"
            width={500}
            height={50}
          />
        </picture>
      </section>
    </>
  );
}
