// src/components/CtaSection.tsx

'use client';

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useI18n } from '../i18n/I18nContext';

const CtaSection = () => {
  const { t } = useI18n();
  return (
    <section id="cierre-pagina" className="bg-black text-white py-20 sm:py-28 border-t border-gray-800">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Columna del Video */}
          <div className="w-full">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl shadow-red-900/20">
              {/* Usamos la etiqueta <video> nativa de HTML con controles */}
              <video controls muted playsInline className="w-full h-full object-cover">
                <source src="/img/videos/spot TSC-1.mp4" type="video/mp4" />
                {t('cta.videoError')}
              </video>
            </div>
          </div>

          {/* Columna del Texto y CTA */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl leading-tight">
              {t('cta.titulo')}
            </h2>
            <p className="mt-6 text-lg leading-7 text-gray-300">
              {t('cta.descripcion1')}
            </p>
            <p className="mt-4 text-lg leading-7 text-gray-300">
              {t('cta.descripcion2')}
            </p>
            <div className="mt-8">
              <a
                href="https://api.whatsapp.com/send/?phone=5217291068887"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-md transition-transform transform hover:scale-105 shadow-lg"
              >
                <FaWhatsapp className="mr-3 text-xl" />
                {t('cta.boton')}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CtaSection;