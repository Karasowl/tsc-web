// src/components/AboutSection.tsx

'use client';

import Image from 'next/image';
import React from 'react';
import { FaAward, FaShieldAlt, FaFileContract } from 'react-icons/fa';
import { useI18n } from '../i18n/I18nContext';

type Accreditation = {
  imageSrc?: string;
  icon?: React.ReactNode;
  alt: string;
  titleKey: string;
  descriptionKey: string;
};

const AboutSection = () => {
  const { t } = useI18n();

  // Tarjetas de acreditaciones — cada una con icono decorado
  const accreditations: Accreditation[] = [
    {
      icon: <FaFileContract className="text-red-500 text-3xl" />,
      alt: "Icono de Permisos Vigentes",
      titleKey: "about.permisos.titulo",
      descriptionKey: "about.permisos.descripcion",
    },
    {
      icon: <FaAward className="text-red-500 text-3xl" />,
      alt: "Icono de Estándares de Calidad",
      titleKey: "about.ctpat.titulo",
      descriptionKey: "about.ctpat.descripcion",
    },
    {
      imageSrc: "/img/permisos-y-acreditaciones/REPSE.webp",
      icon: <FaShieldAlt className="text-red-500 text-3xl" />,
      alt: "Logo de Registro REPSE",
      titleKey: "about.repse.titulo",
      descriptionKey: "about.repse.descripcion",
    },
  ];

  return (
    <section
      id="work"
      className="relative bg-black text-white py-24 sm:py-32 overflow-hidden"
    >
      {/* Resplandor de fondo sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.08),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative">
        {/* Eyebrow + título */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-red-400 mb-4">
            Seguridad Legal · REPSE · Toluca
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {t('about.titulo')}
          </h2>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-gray-300">
            {t('about.descripcion')}{' '}
            <strong className="font-semibold text-white">{t('about.permisosFederales')}</strong>,{' '}
            <strong className="font-semibold text-white">{t('about.acreditacionCTPAT')}</strong> y{' '}
            <strong className="font-semibold text-white">{t('about.registroREPSE')}</strong>,{' '}
            {t('about.descripcionFinal')}
          </p>
        </div>

        {/* Grid de acreditaciones */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {accreditations.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white/[0.03] backdrop-blur-md ring-1 ring-white/10 p-8 rounded-2xl flex flex-col transition-all duration-300 hover:ring-red-500/50 hover:bg-white/[0.05] hover:-translate-y-1"
            >
              {/* Borde superior con glow en hover */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent transition-all duration-500" />

              {/* Icono en círculo */}
              <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-xl bg-red-500/10 ring-1 ring-red-500/30 mb-6 group-hover:bg-red-500/20 group-hover:ring-red-500/60 transition-all duration-300">
                {item.icon}
                <div className="absolute inset-0 rounded-xl bg-red-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Título */}
              <h3 className="text-xl font-bold mb-2 text-white">
                {t(item.titleKey)}
              </h3>

              {/* Descripción */}
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base flex-grow">
                {t(item.descriptionKey)}
              </p>

              {/* Logo pequeño al pie si existe */}
              {item.imageSrc && (
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center opacity-60 group-hover:opacity-100 transition-opacity">
                  <Image
                    src={item.imageSrc}
                    alt={item.alt}
                    width={80}
                    height={30}
                    className="max-h-8 w-auto"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
