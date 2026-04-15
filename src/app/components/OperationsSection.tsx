// src/components/OperationsSection.tsx

'use client';

import React from 'react';
import { FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa'; // Iconos para el botón de contacto y pins
import { useI18n } from '../i18n/I18nContext';

const OperationsSection = () => {
  const { t } = useI18n();
  return (
    <section id="about-operations" className="bg-black text-white py-20 sm:py-28 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Columna del Mapa Local — SVG estilizado del Valle de Toluca */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="w-full max-w-md lg:max-w-none bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 ring-1 ring-red-500/20 shadow-2xl shadow-red-900/20">
              <svg
                viewBox="0 0 500 400"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Mapa estilizado del Valle de Toluca con cobertura en Toluca, Metepec y Lerma"
                className="w-full h-auto"
              >
                {/* Fondo con grilla sutil */}
                <defs>
                  <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
                    <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#1f2937" strokeWidth="0.5" />
                  </pattern>
                  <radialGradient id="pulseRed" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#dc2626" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="500" height="400" fill="url(#grid)" />

                {/* Silueta estilizada del Valle de Toluca */}
                <path
                  d="M 80 180 Q 120 120 200 110 Q 280 100 350 140 Q 420 170 430 240 Q 430 310 370 340 Q 280 370 200 355 Q 120 340 90 280 Q 70 220 80 180 Z"
                  fill="#111827"
                  stroke="#374151"
                  strokeWidth="2"
                />

                {/* Conectores sutiles entre municipios */}
                <line x1="220" y1="200" x2="290" y2="240" stroke="#4b5563" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="290" y1="240" x2="360" y2="200" stroke="#4b5563" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="220" y1="200" x2="180" y2="280" stroke="#4b5563" strokeWidth="1" strokeDasharray="4 4" />

                {/* Pin: Toluca (centro-izquierda) */}
                <g transform="translate(220, 200)">
                  <circle r="14" fill="#374151" stroke="#9ca3af" strokeWidth="1.5" />
                  <circle r="6" fill="#9ca3af" />
                  <text x="0" y="-24" textAnchor="middle" fill="#e5e7eb" fontSize="14" fontWeight="600" fontFamily="sans-serif">Toluca</text>
                </g>

                {/* Pin: Metepec (centro-derecha) */}
                <g transform="translate(290, 240)">
                  <circle r="14" fill="#374151" stroke="#9ca3af" strokeWidth="1.5" />
                  <circle r="6" fill="#9ca3af" />
                  <text x="0" y="32" textAnchor="middle" fill="#e5e7eb" fontSize="14" fontWeight="600" fontFamily="sans-serif">Metepec</text>
                </g>

                {/* Pin: Lerma (derecha) */}
                <g transform="translate(360, 200)">
                  <circle r="14" fill="#374151" stroke="#9ca3af" strokeWidth="1.5" />
                  <circle r="6" fill="#9ca3af" />
                  <text x="0" y="-24" textAnchor="middle" fill="#e5e7eb" fontSize="14" fontWeight="600" fontFamily="sans-serif">Lerma</text>
                </g>

                {/* Pin DESTACADO: oficina TSC (cerca del aeropuerto) */}
                <g transform="translate(180, 280)">
                  {/* Halo pulsante */}
                  <circle r="40" fill="url(#pulseRed)">
                    <animate attributeName="r" values="30;48;30" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle r="18" fill="#dc2626" stroke="#fecaca" strokeWidth="2" />
                  <circle r="8" fill="#ffffff" />
                  <text x="0" y="44" textAnchor="middle" fill="#fca5a5" fontSize="13" fontWeight="700" fontFamily="sans-serif">TSC · Oficina</text>
                  <text x="0" y="60" textAnchor="middle" fill="#9ca3af" fontSize="11" fontFamily="sans-serif">Cerca del Aeropuerto de Toluca</text>
                </g>
              </svg>

              {/* Badge inferior */}
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-300">
                <FaMapMarkerAlt className="text-red-500" />
                <span className="font-semibold">Cobertura Valle de Toluca</span>
              </div>
            </div>

            {/* Texto superpuesto: visible solo en pantallas medianas y grandes */}
            <div className="hidden md:block absolute top-1/4 left-3/4 -translate-x-1/2 bg-gray-900/70 p-4 rounded-lg backdrop-blur-sm border border-white/10 shadow-lg">
              <h5 className="font-bold">{t('header.contactanos')}</h5>
              <a
                href="#formulario-contacto"
                className="text-sm text-red-400 hover:text-red-300 transition-colors"
              >
                {t('operations.contactBox.boton')}
              </a>
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