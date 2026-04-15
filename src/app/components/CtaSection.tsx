// src/components/CtaSection.tsx

'use client';

import React from 'react';
import { FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import { useI18n } from '../i18n/I18nContext';

const CtaSection = () => {
  const { t } = useI18n();
  return (
    <section
      id="cierre-pagina"
      className="relative bg-black text-white py-24 sm:py-32 border-t border-white/5 overflow-hidden"
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(220,38,38,0.1),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Columna del Video */}
          <div className="w-full">
            <div className="relative aspect-video rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-red-900/30 group">
              {/* Glow decorativo alrededor */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/30 via-red-500/20 to-red-700/30 rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 -z-10" />

              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
                poster="/img/imagen-fallback.jpg"
              >
                <source src="/img/Videos/spot%20TSC-1.mp4" type="video/mp4" />
                {t('cta.videoError')}
              </video>
            </div>
          </div>

          {/* Columna del Texto y CTA */}
          <div className="text-center lg:text-left">
            <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-red-400 mb-4">
              Atención desde Toluca
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              {t('cta.titulo')}
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-gray-300">
              {t('cta.descripcion1')}
            </p>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-400">
              {t('cta.descripcion2')}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <a
                href="https://api.whatsapp.com/send/?phone=5217291068887"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3.5 px-7 rounded-lg shadow-xl shadow-red-900/50 hover:shadow-red-700/60 hover:scale-[1.02] transition-all duration-300"
              >
                <FaWhatsapp className="text-xl" />
                <span>{t('cta.boton')}</span>
              </a>
              <a
                href="#formulario-contacto"
                className="group inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 hover:border-red-500/60 text-white font-semibold py-3.5 px-7 rounded-lg transition-all duration-300"
              >
                <span>Solicitar Cotización</span>
                <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CtaSection;
