// src/components/TestimonialsSection.tsx

"use client";

import React, { useRef } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useI18n } from '../i18n/I18nContext';

// Datos de los testimonios en un array para fácil gestión
const testimonialsData = [
  {
    author: 'Rios Esther',
    rating: 5,
    text: 'Oportunidad de crecimiento. Buena empresa.',
    logoSrc: '/img/testimonial/t-logo.png' // Logo testimonial
  },
  {
    author: 'Lopez Samy',
    rating: 5,
    text: 'Llevo ya varios meses trabajando en TSC Seguridad Privada y mi experiencia ha sido excelente. El ambiente laboral es muy ameno: se respira compañerismo y respeto en cada área. La comunicación con los mandos y entre compañeros es fluida y transparente, lo que facilita resolver dudas y proponer mejoras.',
    logoSrc: '/img/testimonial/t-logo2.png' // Logo testimonial
  },
  // Puedes añadir más testimonios aquí
  // {
  //   author: 'Otro Cliente',
  //   rating: 5,
  //   text: 'Un servicio excepcional y muy profesional. Totalmente recomendados.',
  //   logoSrc: '/img/logo.png'
  // },
];

// Un pequeño componente para renderizar las estrellas
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center space-x-1 text-red-500">
    {Array.from({ length: rating }).map((_, index) => (
      <FaStar key={index} />
    ))}
  </div>
);

const TestimonialsSection = () => {
  const { t } = useI18n();
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
  };

  return (
    <section className="bg-black py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
         {/* Título opcional */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('testimonios.titulo')}
          </h2>
          <p className="mt-4 text-lg leading-7 text-gray-400">
            {t('testimonios.subtitulo')}
          </p>
        </div>

        {/* Vista Desktop - Grid estático */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6">
          {testimonialsData.map((testimonial, index) => (
            <div key={index}>
              <div 
                className="h-full bg-gray-900/50 p-6 lg:p-8 rounded-lg border border-gray-800 relative overflow-hidden min-h-[280px]"
              >
                {/* Elemento de fondo decorativo */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-800/50 -translate-y-1/2 translate-x-1/2 rotate-45 opacity-20"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white">{testimonial.author}</h3>
                    <StarRating rating={testimonial.rating} />
                  </div>
                  <p className="text-gray-300 flex-grow mb-6">
                    "{testimonial.text}"
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-700/50">
                    <Image
                      src={testimonial.logoSrc}
                      alt={`Logo de ${testimonial.author}`}
                      width={80}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Vista Móvil - Carrusel */}
        <div className="lg:hidden relative">
          <Slider ref={sliderRef} {...settings}>
            {testimonialsData.map((testimonial, index) => (
              <div key={index} className="px-3">
                <div 
                  className="h-full bg-gray-900/50 p-6 rounded-lg border border-gray-800 relative overflow-hidden min-h-[280px]"
                >
                  {/* Elemento de fondo decorativo */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gray-800/50 -translate-y-1/2 translate-x-1/2 rotate-45 opacity-20"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white">{testimonial.author}</h3>
                      <StarRating rating={testimonial.rating} />
                    </div>
                    <p className="text-gray-300 flex-grow mb-6">
                      "{testimonial.text}"
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-700/50">
                      <Image
                        src={testimonial.logoSrc}
                        alt={`Logo de ${testimonial.author}`}
                        width={80}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          {/* Flechas de navegación - Solo visibles en móvil */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="bg-red-700 hover:bg-red-800 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              aria-label="Testimonio anterior"
            >
              <FaChevronLeft className="text-lg" />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="bg-red-700 hover:bg-red-800 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              aria-label="Siguiente testimonio"
            >
              <FaChevronRight className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;