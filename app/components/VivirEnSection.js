"use client";

import Link from "next/link";
import Image from "next/image";

export default function VivirEnSection({ project }) {
  if (project === "soil") {
    return (
      <section className="map-section">
        <div className="map-section__container">
          <div className="map-data">
            <span>PROYECTOS</span>
            <h2>¿Te gustaría vivir en Surco?</h2>
            <Link href="/venta-departamentos/surco-seed">
              Ver Proyectos
            </Link>
          </div>
          <div className="map-container">
            <div id="map" className="layer_back">
              <Link href="/venta-departamentos/surco-seed">
                <Image
                  src="/details/seed-card.png"
                  alt="Seed Edificio"
                  width={400} // Ajusta según tus necesidades
                  height={300}
                />
              </Link>
            </div>
          </div>
        </div>
        <picture>
          <Image
            src="/barra-hojas.png"
            alt="Barra hojas"
            width={800} // Ajusta según tus necesidades
            height={100}
          />
        </picture>
      </section>
    );
  }

  if (project === "seed") {
    return (
      <section className="map-section">
        <div className="map-section__container">
          <div className="map-data">
            <span>PROYECTOS</span>
            <h2>¿Te gustaría vivir en Pueblo Libre?</h2>
            <Link href="/venta-departamentos/pueblo-libre-soil">
              Ver Proyectos
            </Link>
          </div>
          <div className="map-container">
            <div id="map" className="layer_back">
              <Link href="/venta-departamentos/pueblo-libre-soil">
                <Image
                  src="/details/SOIL_familia.jpg"
                  alt="Vive en Soil Pueblo Libre"
                  width={400} // Ajusta según tus necesidades
                  height={300}
                />
              </Link>
            </div>
          </div>
        </div>
        <picture>
          <Image
            src="/barra-hojas.png"
            alt="Barra hojas"
            width={800} // Ajusta según tus necesidades
            height={100}
          />
        </picture>
      </section>
    );
  }

  return null;
}
