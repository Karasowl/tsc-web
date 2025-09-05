// src/components/ClientsSection.tsx

"use client"; // Este componente es interactivo (un carrusel), necesita ser un Client Component

import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useI18n } from '../i18n/I18nContext';

// Lista de logos de clientes basada en el HTML original
const clients = [
  { src: '/img/brand/b-logo1.png', alt: 'Cliente 1' },
  { src: '/img/brand/b-logo2.png', alt: 'Cliente 2' },
  { src: '/img/brand/b-logo4.png', alt: 'Cliente 3' },
  { src: '/img/brand/b-logo5.png', alt: 'Cliente 4' },
  { src: '/img/brand/b-logo6.png', alt: 'Cliente 5' },
  { src: '/img/brand/b-logo3.png', alt: 'Cliente 6' },
];

const ClientsSection = () => {
  const { t } = useI18n();
  const sliderRef = useRef<Slider>(null);
  const [currentMobileSlide, setCurrentMobileSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Forzar el autoplay solo en desktop
  useEffect(() => {
    const handleAutoplay = () => {
      if (window.innerWidth > 1024 && sliderRef.current) {
        sliderRef.current.slickNext();
      }
    };
    
    const timer = setTimeout(() => {
      if (window.innerWidth > 1024 && sliderRef.current) {
        sliderRef.current.slickPlay();
      }
    }, 100);
    
    // Crear un intervalo manual solo para desktop
    const interval = setInterval(handleAutoplay, 2000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);
  
  // Funciones para móvil
  const handleMobilePrev = () => {
    setCurrentMobileSlide(prev => 
      prev === 0 ? clients.length - 1 : prev - 1
    );
  };
  
  const handleMobileNext = () => {
    setCurrentMobileSlide(prev => 
      prev === clients.length - 1 ? 0 : prev + 1
    );
  };
  
  // Configuración del carrusel
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    pauseOnFocus: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          infinite: true,
          pauseOnHover: false,
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          infinite: true,
          pauseOnHover: false,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          infinite: true,
          pauseOnHover: false,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: false,
          infinite: true,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: false,
          infinite: true,
          speed: 300,
        }
      }
    ]
  };

  return (
    <section className="brand-area py-16 sm:py-20 md:py-24 lg:py-28 wow fadeInDown animated bg-gray-900" 
      data-animation="fadeInDown" 
      data-delay=".4s"
      style={{ visibility: 'visible', animationName: 'fadeInDown' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                {t('clientes.titulo')}
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-6 sm:leading-7 text-gray-400 px-4 sm:px-0">
                {t('clientes.subtitulo')}
              </p>
            </div>
          </div>
        </div>

        {/* Vista móvil - Sin Slick */}
        {isMobile ? (
          <div className="relative w-full">
            <div className="flex items-center justify-center h-48 bg-gray-700/20 rounded-lg p-8">
              <Image
                src={clients[currentMobileSlide].src}
                alt={clients[currentMobileSlide].alt}
                width={280}
                height={140}
                className="object-contain max-h-40 w-auto filter brightness-0 invert opacity-100"
                style={{ filter: 'brightness(0) invert(1) opacity(1)' }}
              />
            </div>
            
            {/* Flechas para móvil */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleMobilePrev}
                className="bg-red-600 hover:bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all"
                aria-label="Cliente anterior"
              >
                <FaChevronLeft className="text-lg" />
              </button>
              <button
                onClick={handleMobileNext}
                className="bg-red-600 hover:bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all"
                aria-label="Siguiente cliente"
              >
                <FaChevronRight className="text-lg" />
              </button>
            </div>
          </div>
        ) : (
          /* Vista desktop - Con Slick */
          <div className="row brand-active relative w-full">
            {/* Flecha izquierda */}
            <button
              type="button"
              onClick={() => sliderRef.current?.slickPrev()}
              className="slick-prev slick-arrow absolute top-1/2 -translate-y-1/2 z-20 bg-red-600 hover:bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-xl hidden lg:flex"
              style={{ left: '1%' }}
              aria-label="Cliente anterior"
            >
              <FaChevronLeft className="text-xl" />
            </button>

            {/* Carrusel desktop */}
            <div className="w-full clients-carousel">
              <Slider ref={sliderRef} {...settings}>
                {clients.map((client, index) => (
                  <div key={index} className="single-brand">
                    <div className="flex items-center justify-center h-40 px-4">
                      <div className="bg-gray-700/20 rounded-lg p-6 hover:bg-gray-700/30 transition-all duration-300 w-full max-w-[280px] h-32 flex items-center justify-center">
                        <Image
                          src={client.src}
                          alt={client.alt}
                          width={260}
                          height={120}
                          className="object-contain max-h-28 w-auto filter brightness-0 invert opacity-100 transition-all duration-300"
                          style={{ filter: 'brightness(0) invert(1) opacity(1)' }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

            {/* Flecha derecha */}
            <button
              type="button"
              onClick={() => sliderRef.current?.slickNext()}
              className="slick-next slick-arrow absolute top-1/2 -translate-y-1/2 z-20 bg-red-600 hover:bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-xl hidden lg:flex"
              style={{ right: '1%' }}
              aria-label="Siguiente cliente"
            >
              <FaChevronRight className="text-xl" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientsSection;