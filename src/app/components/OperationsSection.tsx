// src/components/OperationsSection.tsx

'use client';

import Image from 'next/image';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Icono para el botón de contacto
import { useI18n } from '../i18n/I18nContext';

const OperationsSection = () => {
  const { t } = useI18n();
  return (
    <section id="about-operations" className="bg-black text-white py-20 sm:py-28 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Columna del Mapa */}
          <div className="relative flex justify-center lg:justify-start">
            <Image
              src="/img/features/about_img_04.png"
              alt="Mapa de operaciones de TSC en México"
              width={550}
              height={550}
              className="w-full max-w-md lg:max-w-none object-contain -rotate-6 transform hover:rotate-0 hover:scale-105 transition-transform duration-500 ease-in-out"
            />
            {/* Texto superpuesto: visible solo en pantallas medianas y grandes */}
            <div className="hidden md:block absolute top-1/4 left-3/4 -translate-x-1/2 bg-gray-900/60 p-4 rounded-lg backdrop-blur-sm border border-white/10 shadow-lg">
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