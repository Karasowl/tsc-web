// src/components/OperationsSection.tsx

'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { FaWhatsapp, FaMapMarkerAlt, FaPlaneDeparture, FaBuilding, FaArrowRight } from 'react-icons/fa';
import TrackedLeadLink from '@/app/components/TrackedLeadLink';
import { useI18n } from '../i18n/I18nContext';

// Leaflet accede a `window` al importar → cargar sólo en client
const CoverageMap = dynamic(() => import('./CoverageMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-900/60 rounded-xl">
      <div className="text-gray-500 text-sm">Cargando mapa…</div>
    </div>
  ),
});

const OperationsSection = () => {
  const { t } = useI18n();

  const quickInfo = [
    { icon: <FaBuilding />, label: 'Oficina', value: 'Toluca · San Mateo Otzacatipan' },
    { icon: <FaPlaneDeparture />, label: 'Referencia', value: 'Cerca del Aeropuerto' },
    { icon: <FaMapMarkerAlt />, label: 'Cobertura', value: 'Valle de Toluca' },
  ];

  return (
    <section
      id="about-operations"
      className="relative bg-black text-white py-24 sm:py-32 overflow-hidden"
    >
      {/* Glow fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_left,rgba(220,38,38,0.08),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Columna del Mapa */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-900/80 via-black/60 to-black rounded-2xl p-4 ring-1 ring-white/10 shadow-2xl shadow-red-900/20 backdrop-blur-sm">
              <div className="relative w-full h-[440px] rounded-xl overflow-hidden">
                <CoverageMap />
              </div>

              {/* Badge inferior */}
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-300">
                <FaMapMarkerAlt className="text-red-500" />
                <span className="font-semibold tracking-wide">Cobertura Valle de Toluca</span>
              </div>
            </div>
          </div>

          {/* Columna del Texto */}
          <div className="text-left">
            <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-red-400 mb-4">
              Operaciones locales
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]">
              {t('operations.titulo')}
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-gray-300">
              {t('operations.descripcion')}
            </p>

            {/* Info rápida */}
            <ul className="mt-8 space-y-3">
              {quickInfo.map((info, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 p-4 bg-white/[0.03] backdrop-blur-md ring-1 ring-white/10 rounded-xl hover:ring-red-500/40 transition-all"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-red-500/15 ring-1 ring-red-500/30 text-red-400 flex-shrink-0">
                    {info.icon}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-400">
                      {info.label}
                    </span>
                    <span className="text-white font-semibold text-sm sm:text-base">
                      {info.value}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <TrackedLeadLink
                channel="whatsapp"
                placement="operations_section_whatsapp"
                href="https://api.whatsapp.com/send/?phone=5217291068887&text=%C2%A1Hola%21%20Quisiera%20contratar%20servicios%20de%20seguridad%20privada"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-xl shadow-red-900/50 hover:shadow-red-700/60 hover:scale-[1.02] transition-all"
              >
                <FaWhatsapp className="text-lg" />
                <span>{t('header.contactanos')}</span>
              </TrackedLeadLink>
              <a
                href="#formulario-contacto"
                className="group inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 hover:border-red-500/60 text-white font-semibold py-3 px-6 rounded-lg transition-all"
              >
                <span>{t('operations.contactBox.boton')}</span>
                <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OperationsSection;
