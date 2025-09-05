// src/components/AboutSection.tsx

'use client';

import Image from 'next/image';
import React from 'react';
import { useI18n } from '../i18n/I18nContext';

const AboutSection = () => {
  const { t } = useI18n();
  
  // Datos para las tarjetas de acreditaciones
  const accreditations = [
    {
      imageSrc: "/img/permisos-y-acreditaciones/permisos.webp",
      alt: "Icono de Permisos Federales y Estatales",
      titleKey: "about.permisos.titulo",
      descriptionKey: "about.permisos.descripcion",
    },
    {
      imageSrc: "/img/permisos-y-acreditaciones/ctpat-logo-horizontal-300x69.png",
      alt: "Logo de Acreditación CTPAT",
      titleKey: "about.ctpat.titulo",
      descriptionKey: "about.ctpat.descripcion",
    },
    {
      imageSrc: "/img/permisos-y-acreditaciones/REPSE.webp",
      alt: "Logo de Registro REPSE",
      titleKey: "about.repse.titulo",
      descriptionKey: "about.repse.descripcion",
    },
  ];
  return (
    <section id="work" className="bg-black text-white py-20 sm:py-28">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Título y descripción de la sección */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('about.titulo')}
          </h2>
          <p className="mt-6 text-lg leading-7 text-gray-300">
            {t('about.descripcion')} <strong className="font-semibold text-white">{t('about.permisosFederales')}</strong>, <strong className="font-semibold text-white">{t('about.acreditacionCTPAT')}</strong> y <strong className="font-semibold text-white">{t('about.registroREPSE')}</strong>, {t('about.descripcionFinal')}
          </p>
        </div>

        {/* Grid de Acreditaciones */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {accreditations.map((item, index) => (
            <div 
              key={index} 
              className="bg-gray-900/50 ring-1 ring-white/10 p-8 rounded-xl flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:scale-105 hover:ring-red-500/50 hover:shadow-2xl hover:shadow-red-900/20"
            >
              <div className="h-24 flex items-center justify-center mb-6">
                <Image
                  src={item.imageSrc}
                  alt={item.alt}
                  width={150}
                  height={60}
                  className="max-h-16 w-auto" // Controla el tamaño de la imagen dentro del contenedor
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t(item.titleKey)}</h3>
              <p className="text-gray-400 leading-relaxed">{t(item.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;