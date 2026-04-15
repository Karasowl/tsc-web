// src/components/ContactSection.tsx

'use client';

import React from 'react';
import ContactForm from './ContactForm';
import { FaShieldAlt, FaCheckCircle, FaClock, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { useI18n } from '../i18n/I18nContext';

const ContactSection = () => {
  const { t } = useI18n();

  const benefits = [
    { icon: <FaClock />, label: 'Respuesta rápida desde Toluca' },
    { icon: <FaShieldAlt />, label: 'REPSE vigente · STPS' },
    { icon: <FaCheckCircle />, label: 'Cotización sin compromiso' },
  ];

  return (
    <section
      id="formulario-contacto"
      className="relative bg-black text-white py-24 sm:py-32 overflow-hidden"
    >
      {/* Glow fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(220,38,38,0.1),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Columna izquierda: beneficios (oculta en móvil) */}
          <div className="hidden lg:block lg:col-span-2 space-y-8 lg:sticky lg:top-24">
            <div>
              <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-red-400 mb-4">
                Cotización directa
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]">
                {t('contact.titulo')}
              </h2>
              <p className="mt-5 text-lg text-gray-300 leading-relaxed">
                {t('contact.subtitulo')}
              </p>
            </div>

            {/* Beneficios con checks */}
            <ul className="space-y-4">
              {benefits.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-4 bg-white/[0.03] backdrop-blur-md ring-1 ring-white/10 rounded-xl hover:ring-red-500/40 transition-all"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-red-500/15 ring-1 ring-red-500/30 text-red-400 flex-shrink-0">
                    {b.icon}
                  </span>
                  <span className="text-white font-medium pt-2">{b.label}</span>
                </li>
              ))}
            </ul>

            {/* Info rápida de contacto */}
            <div className="pt-6 border-t border-white/10 space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-300">
                <FaPhoneAlt className="text-red-400" />
                <span className="font-semibold text-white">729 106 8887</span>
              </div>
              <div className="flex items-start gap-3 text-gray-400">
                <FaMapMarkerAlt className="text-red-400 mt-1 flex-shrink-0" />
                <span>BLVD. Miguel Alemán 307, San Mateo Otzacatipan, Toluca · Cerca del Aeropuerto</span>
              </div>
            </div>
          </div>

          {/* Columna derecha: form */}
          <div className="lg:col-span-3">
            {/* Encabezado mobile */}
            <div className="lg:hidden text-center mb-8">
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-red-400 mb-3">
                Cotización directa
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.05]">
                {t('contact.titulo')}
              </h2>
              <p className="mt-3 text-base text-gray-300">
                {t('contact.subtitulo')}
              </p>
            </div>

            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
