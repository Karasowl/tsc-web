// src/components/GallerySection.tsx

import Image from 'next/image';
import React from 'react';
import { FaStarOfLife } from 'react-icons/fa'; // Usaremos un icono para el ticker

// Lista de imágenes a mostrar en la galería
const galleryImages = [
  // { src: '/img/gallery/protfolio-img01.jpg', alt: 'Guardia de seguridad en servicio' },
  { src: '/img/gallery/protfolio-img02.jpg', alt: 'Equipo de seguridad revisando un vehículo' },
  // { src: '/img/gallery/protfolio-img03.jpg', alt: 'Personal de seguridad' },
  { src: '/img/gallery/protfolio-img04.jpg', alt: 'Servicios de seguridad' },
];

// Lista de servicios para el ticker. Se duplicará para el efecto infinito.
const servicesTicker = [
  "Seguridad privada",
  { text: "Custodia", highlighted: true },
  "Consultoría",
  "Protección ejecutiva",
  "Examen de confianza",
  "Intramuros",
];

const GallerySection = () => {
  return (
    <section className="bg-black py-20 sm:py-28">
      {/* Galería de Imágenes */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleryImages.map((image, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg shadow-gray-900">
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Ticker/Marquee de Servicios */}
      <div className="mt-20 w-full overflow-hidden bg-gray-900/50 py-4 relative">
        <div className="flex animate-scroll-x hover:[animation-play-state:paused]">
          {/* Renderizamos la lista de servicios dos veces para un bucle continuo */}
          {[...servicesTicker, ...servicesTicker].map((item, index) => (
            <div key={index} className="flex-shrink-0 flex items-center mx-6">
              <FaStarOfLife className="text-gray-600 mr-3 text-sm" />
              {typeof item === 'string' ? (
                <span className="text-gray-300 text-lg font-semibold whitespace-nowrap">{item}</span>
              ) : (
                <span className="text-red-500 text-lg font-semibold whitespace-nowrap">{item.text}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;