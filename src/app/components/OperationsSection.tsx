// src/components/OperationsSection.tsx

'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import { useI18n } from '../i18n/I18nContext';

// Leaflet accede a `window` al importar → debe cargarse sólo en client
const CoverageMap = dynamic(() => import('./CoverageMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-900/60 rounded-2xl">
      <div className="text-gray-500 text-sm">Cargando mapa…</div>
    </div>
  ),
});

const OperationsSection = () => {
  const { t } = useI18n();
  return (
    <section id="about-operations" className="bg-black text-white py-20 sm:py-28 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Columna del Mapa — react-leaflet + CartoDB Dark */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-4 ring-1 ring-red-500/20 shadow-2xl shadow-red-900/20">
              <div className="relative w-full h-[420px] rounded-xl overflow-hidden">
                <CoverageMap />
              </div>

              {/* Badge inferior */}
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-300">
                <FaMapMarkerAlt className="text-red-500" />
                <span className="font-semibold">Cobertura Valle de Toluca</span>
              </div>
            </div>
          </div>

          {/* Columna del Texto y CTA */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl leading-tight">
              {t('operations.titulo')}
            </h2>
            <p className="mt-6 text-lg leading-7 text-gray-300">
              {t('operations.descripcion')}
            </p>
            <div className="mt-8">
              <a
                href="https://api.whatsapp.com/send/?phone=5217291068887"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-md transition-transform transform hover:scale-105 shadow-lg"
              >
                <FaWhatsapp className="mr-3 text-xl" />
                {t('header.contactanos')}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OperationsSection;
