'use client';

import React from 'react';
import Link from 'next/link';
import { FaArrowRight, FaShieldAlt } from 'react-icons/fa';
import { useI18n } from '../i18n/I18nContext';

type StatProps = { label: string; value: string };
const Stat = ({ label, value }: StatProps) => (
  <div className="flex flex-col border-l-2 border-red-500/60 pl-4">
    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-red-400">
      {label}
    </span>
    <span className="mt-1 text-base sm:text-lg font-bold text-white leading-tight">
      {value}
    </span>
  </div>
);

const Hero = () => {
  const { t } = useI18n();

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center text-white overflow-hidden"
    >
      {/* Videos de fondo */}
      <video
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
        src="/img/videoseg.mp4"
        poster="/img/imagen-fallback.jpg"
        autoPlay
        muted
        loop
        playsInline
        style={{ objectPosition: '50% -40%' }}
      />
      <video
        className="absolute inset-0 w-full h-full object-cover md:hidden"
        src="/img/Videos/video-mobile.mp4"
        poster="/img/imagen-fallback-mobile.jpg"
        autoPlay
        muted
        loop
        playsInline
        style={{ objectPosition: '50% -30%' }}
      />

      {/* Overlays con gradientes para legibilidad y dirección visual */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(220,38,38,0.15),transparent_60%)] pointer-events-none" />

      {/* Contenido */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 relative z-10 pt-28 pb-20">
        <div className="max-w-4xl">
          {/* Badge pill superior con dot animado */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 backdrop-blur-md mb-6 sm:mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-red-200">
              REPSE Vigente · Valle de Toluca · 24/7
            </span>
          </div>

          {/* Título con gradiente en la línea final */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02]">
            <span className="block text-white">{t('hero.titulo')}</span>
            <span className="block text-white">{t('hero.titulo2')}</span>
            <span className="block bg-gradient-to-r from-red-400 via-red-500 to-red-700 bg-clip-text text-transparent">
              {t('hero.tituloComplemento')}
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
            {t('hero.subtitulo')}{' '}
            <span className="font-semibold text-white">
              {t('hero.subtituloFinal')}
            </span>
          </p>

          {/* CTAs modernos */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="#formulario-contacto"
              className="group inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-lg shadow-xl shadow-red-900/50 hover:shadow-red-700/60 hover:scale-[1.02] transition-all duration-300"
            >
              <span>{t('hero.botonCotiza')}</span>
              <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 hover:border-red-500/60 text-white font-semibold rounded-lg transition-all duration-300"
            >
              <FaShieldAlt className="text-red-400 text-sm" />
              <span>{t('hero.botonExplorar')}</span>
            </Link>
          </div>

          {/* Stats strip */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-3xl">
            <Stat label="Registro" value="REPSE Vigente" />
            <Stat label="Cobertura" value="Valle de Toluca" />
            <Stat label="Atención" value="24/7" />
            <Stat label="Base" value="Toluca · Aeropuerto" />
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-60">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
          Scroll
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-red-500/80 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
