"use client";
import Link from "next/link";
import "../styles/components/dontgo.css";

import { useState, useEffect, useRef } from "react";

// Mapeo de imágenes para cada variante
const data = {
  standard: {
    sticker: "/VERDI/StickersVerdi_Mesa de trabajo 1-05.png",
    background: "/bg-leaf.png",
    title: "¡No te vayas!",
    text: "¿Ya encontraste tu ",
    highlightText: "nuevo hogar?",
    buttonText: "Ver proyectos",
    buttonLink: "/proyectos",
  },
  alternate: {
    sticker: "/VERDI/StickersVerdi_Mesa de trabajo 1-01.png", // Imagen alternativa para el sticker
    background: "/bg-leaf2.png", // Imagen alternativa para el fondo
    title: "¡No te vayas!",
    text: "Estoy aquí para ayudarte",
    highlightText: "",
    buttonText: "Cotiza",
    buttonLink: "#cotiza",
  },
};

// Componente del overlay que renderiza según la variante
const DontGoOverlay = ({ variant, onClose, onButtonClick }) => {
  // Define la clase CSS según la variante
  const overlayClass =
    variant === "alternate" ? "dontgo-overlay2" : "dontgo-overlay";
  // Obtiene las imágenes según la variante; si no existe la variante, se usa 'standard'
  const dataVersions = data[variant] || data.standard;

  return (
    <div className={overlayClass} style={{ display: "flex", opacity: 1 }}>
      <div className="dontgo-container">
        <h1>{dataVersions.title}</h1>
        <span>
          {dataVersions.text}
          <mark>{dataVersions.highlightText}</mark>
        </span>
        <div>
          <img src={dataVersions.sticker} alt="Verdi no quiere que te vayas" />
          <Link href={dataVersions.buttonLink} onClick={onButtonClick}>
            {dataVersions.buttonText}
          </Link>
        </div>
        <img src={dataVersions.background} alt="Fondo no te vayas" />
        <button className="close-button" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const DontGoComponent = ({ variant = "standard" }) => {
  // El prop "variant" decide qué overlay mostrar:
  // 'standard' mostrará la versión estándar y 'alternate' la versión alterna.
  const [showOverlay, setShowOverlay] = useState(false);

  // Usamos refs para evitar re-renderizados innecesarios
  const hasTriggeredRef = useRef(false);
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1080) {
        hasScrolledRef.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    const handleMouseMove = (event) => {
      // Si el mouse se mueve en la parte superior (clientY <= 5) y ya se hizo scroll
      if (
        event.clientY <= 5 &&
        hasScrolledRef.current &&
        !hasTriggeredRef.current
      ) {
        hasTriggeredRef.current = true;
        setShowOverlay(true);
      }
    };

    // Después de 15 segundos se añade el listener de mousemove
    const mouseMoveTimeout = setTimeout(() => {
      document.addEventListener("mousemove", handleMouseMove);
    }, 15000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(mouseMoveTimeout);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Función para cerrar el overlay
  const closeOverlay = () => {
    setShowOverlay(false);
  };

  // Función para manejar el clic en el botón "Cotiza" en la variante "alternate"
  const handleButtonClick = () => {
    if (variant === "alternate") {
      closeOverlay();
    }
  };

  return (
    <div>
      {showOverlay && (
        <DontGoOverlay
          variant={variant}
          onClose={closeOverlay}
          onButtonClick={handleButtonClick}
        />
      )}
    </div>
  );
};

export default DontGoComponent;
