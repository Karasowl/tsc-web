// src/components/GallerySection.tsx

import Image from 'next/image';
import React from 'react';

// Lista de imágenes a mostrar en la galería
const galleryImages = [
  { src: '/img/gallery/protfolio-img02.jpg', alt: 'Equipo de seguridad revisando un vehículo' },
  { src: '/img/gallery/protfolio-img04.jpg', alt: 'Servicios de seguridad' },
];

// Lista de servicios para el ticker. Se duplicará para el efecto infinito.
const servicesTicker = [
  "Seguridad Privada",
  { text: "Guardias Intramuros", highlighted: true },
  "Vigilancia para Empresas",
  "Control de Acceso",
  "Seguridad Industrial",
  "Toluca · Metepec · Lerma",
];

const GallerySection = () => {
  return (
    <section className="relative bg-black py-24 sm:py-32 overflow-hidden">
      {/* Galería de Imágenes */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-black/50 hover:ring-red-500/50 transition-all duration-500"
            >
              <div className="aspect-[16/10] relative">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover filter grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                {/* Overlay oscuro que se aclara */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/50 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ticker de servicios con fade a los lados */}
      <div className="mt-20 relative w-full overflow-hidden py-6 border-y border-white/5 bg-gradient-to-r from-black via-gray-950 to-black">
        {/* Fade lateral izquierdo */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        {/* Fade lateral derecho */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-x hover:[animation-play-state:paused]">
          {[...servicesTicker, ...servicesTicker].map((item, index) => (
            <div key={index} className="flex-shrink-0 flex items-center mx-8">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-4 shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
              {typeof item === 'string' ? (
                <span className="text-gray-300 text-base sm:text-lg font-semibold whitespace-nowrap tracking-wide">
                  {item}
                </span>
              ) : (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 text-base sm:text-lg font-bold whitespace-nowrap tracking-wide">
                  {item.text}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
