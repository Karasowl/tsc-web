'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '../i18n/I18nContext';

const Hero = () => {
  const { t } = useI18n();
  return (
    <section id="inicio" className="hero-section-moderna relative h-screen flex items-center justify-center text-white overflow-hidden">
      {/* 1) Vídeo de fondo */}
      
      {/* Vídeo para Escritorio (Desktop) */}
      <video
        className="hero-video-bg video-desktop absolute inset-0 w-full h-full object-cover hidden md:block"
        src="/img/videoseg.mp4"
        poster="/img/imagen-fallback.jpg"
        autoPlay
        muted
        loop
        playsInline
        style={{ objectPosition: '50% -40%' }}
      />

      {/* Vídeo para Móvil (Mobile) */}
      <video
        className="hero-video-bg video-mobile absolute inset-0 w-full h-full object-cover md:hidden"
        src="/img/Videos/video-mobile.mp4"
        poster="/img/imagen-fallback-mobile.jpg"
        autoPlay
        muted
        loop
        playsInline
        style={{ objectPosition: '50% -30%' }}
      />

      {/* 2) Capa semitransparente (opcional) */}
      <div className="hero-video-overlay absolute inset-0 bg-black/50 pointer-events-none"></div>

      {/* 3) Tu contenido habitual */}
      <div className="hero-contenido-con-formulario container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 flex items-center h-full">
        <div className="hero-contenido-izquierda text-left max-w-3xl mt-10 sm:mt-20 lg:mt-32 ml-8 sm:ml-16 lg:ml-24 xl:ml-32">
          <h1 className="hero-titulo-moderno text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-wide leading-tight text-left">
            <span className="texto-destacado block" style={{ color: 'white' }}>
              {t('hero.titulo')}
            </span>
            <span className="texto-destacado block" style={{ color: 'white' }}>
              {t('hero.titulo2')}
            </span>
            <span className="block" style={{ color: 'white' }}>
              {t('hero.tituloComplemento')}
            </span>
          </h1>
          <p className="hero-subtitulo-moderno mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-left" style={{ color: 'white' }}>
            <span>
              {t('hero.subtitulo')}
            </span>{' '}
            <span className="fondo-rojo px-1 sm:px-2 py-0.5 sm:py-1 rounded inline-block text-xs sm:text-base" style={{ backgroundColor: '#dc2626' }}>
              {t('hero.registroREPSE')}
            </span>{' '}
            <span>{t('hero.subtituloFinal')}</span>
          </p>
          <div className="botones-cta-modernos mt-6 sm:mt-8 flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <Link
              href="#formulario-contacto"
              className="boton-principal-moderno font-bold py-2 px-4 sm:py-3 sm:px-8 text-sm sm:text-base rounded-md transition-transform transform hover:scale-105 w-full sm:w-auto text-center"
              style={{ backgroundColor: '#dc2626', color: 'white' }}
              data-i18n="hero.botonCotiza"
            >
              {t('hero.botonCotiza')}
            </Link>
            <Link 
              href="#services" 
              className="boton-secundario-moderno border-2 font-bold py-2 px-4 sm:py-3 sm:px-8 text-sm sm:text-base rounded-md transition-colors w-full sm:w-auto text-center"
              style={{ borderColor: 'white', color: 'white' }}
              data-i18n="hero.botonExplorar"
            >
              {t('hero.botonExplorar')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;