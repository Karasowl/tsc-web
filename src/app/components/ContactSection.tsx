// src/components/ContactSection.tsx

'use client';

import React from 'react';
import ContactForm from './ContactForm';
import { FaShieldAlt, FaCheckCircle } from 'react-icons/fa';
import { useI18n } from '../i18n/I18nContext';

const ContactSection = () => {
  const { t } = useI18n();
  return (
    <section id="formulario-contacto" className="bg-black text-white py-20 sm:py-28">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Columna de Texto Promocional (oculta en móvil) */}
          <div className="hidden lg:block space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t('contact.titulo')}
              </h2>
              <p className="mt-4 text-xl text-gray-300">
                {t('contact.subtitulo')}
              </p>
            </div>
            
            <div className="bg-gray-800/50 ring-1 ring-red-500/30 p-6 rounded-lg flex items-start space-x-4">
              <FaShieldAlt className="text-red-500 text-3xl flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-lg">{t('contact.seguridad.titulo')}</h4>
                <p className="text-gray-400">
                  {t('contact.seguridad.descripcion')}
                </p>
              </div>
            </div>
            
            <div className="border border-red-700/50 rounded-lg p-6 space-y-4">
               <p className="font-semibold text-center">
                {t('contact.urgencia')}
               </p>
               <div className="flex items-center justify-center text-sm text-green-400">
                 <FaCheckCircle className="mr-2" />
                 <span>{t('contact.garantia')}</span>
               </div>
            </div>
          </div>

          {/* Columna del Formulario */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;