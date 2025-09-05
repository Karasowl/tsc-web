// src/components/FloatingButtons.tsx

"use client";

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { FaWhatsapp, FaArrowUp } from 'react-icons/fa';

const FloatingButtons = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Muestra el botón "Subir" solo si el usuario ha hecho scroll hacia abajo
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // Limpia el evento al desmontar el componente
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
  <div className="fixed z-50">
        {/* Contenedor para el Chatbot - está en la esquina inferior derecha */}
        <div id="bot-avatar">
          {/* El script se inyectará aquí */}
        </div>
        
        {/* Botón de Scroll to Top - AJUSTA bottom y right según necesites */}
        {/* bottom: distancia desde abajo, right: distancia desde la derecha */}
        {isVisible && (
          <button
            onClick={scrollToTop}
            className="bg-red-700 hover:bg-red-800 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-opacity duration-300 fixed"
            style={{ bottom: '100px', right: '24px' }}  // AJUSTA ESTOS VALORES: bottom para subir/bajar, right para izquierda/derecha
            aria-label="Volver arriba"
          >
            <FaArrowUp className="text-2xl" />
          </button>
        )}

        {/* Botón de WhatsApp - AJUSTA bottom y right según necesites */}
        {/* bottom: distancia desde abajo, right: distancia desde la derecha */}
        <a
          href="https://wa.me/5217291068887"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg fixed"
          style={{ bottom: '20px', right: '100px' }}  // AJUSTA ESTOS VALORES: bottom para subir/bajar, right para izquierda/derecha
          aria-label="Contactar por WhatsApp"
        >
          <FaWhatsapp className="text-4xl" />
        </a>
      </div>

      {/* Script del Chatbot de Dindon usando next/script */}
      <Script
        src="https://dindon.onrender.com/loader.js"
        strategy="afterInteractive" // Carga el script después de que la página sea interactiva
        data-bot-color="#59211d"
        data-workspace-id="6bf877db-00ec-49c7-a1c2-6644e345cc91"
      />
    </>
  );
};

export default FloatingButtons;