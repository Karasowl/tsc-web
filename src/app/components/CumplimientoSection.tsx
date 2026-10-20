// src/components/CumplimientoSection.tsx

'use client';

import Link from 'next/link';
import React from 'react';
import { FaArrowRight, FaClipboardCheck, FaClock, FaUserShield } from 'react-icons/fa';

type Punto = {
  icon: React.ReactNode;
  titulo: string;
  descripcion: string;
};

// Reforma de jornada: DOF 3-mar-2026 (constitucional) y 1-may-2026 (LFT, registro electrónico desde 1-ene-2027)
const puntos: Punto[] = [
  {
    icon: <FaClipboardCheck className="text-red-500 text-2xl" />,
    titulo: 'Registro electrónico desde enero de 2027',
    descripcion:
      'Cada empresa deberá registrar la entrada y salida real de cada trabajador. Las horas de tu guardia quedan documentadas y se pueden revisar.',
  },
  {
    icon: <FaClock className="text-red-500 text-2xl" />,
    titulo: 'Jornadas más cortas cada año',
    descripcion:
      'La jornada ordinaria baja a 46 horas en 2027 y llega a 40 en 2030, con un máximo de 12 horas al día entre ordinarias y extra. Un turno de 24 horas seguidas ya no cabe.',
  },
  {
    icon: <FaUserShield className="text-red-500 text-2xl" />,
    titulo: 'Plantillas que ya cumplen',
    descripcion:
      'Cotizamos cada puesto con el personal que pide la ley y con REPSE vigente. Tu operación no depende de un esquema que tendrá que cambiar.',
  },
];

const CumplimientoSection = () => {
  return (
    <section id="cumplimiento" className="relative bg-gray-950 text-white py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(220,38,38,0.10),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-red-400 mb-4">
            Reforma laboral 2027
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Tu guardia también tiene que cumplir la ley
          </h2>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-gray-300">
            La reforma a la Ley Federal del Trabajo cambia cómo se cubre un puesto de vigilancia. Esto es lo que cambia y
            cómo lo resolvemos.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {puntos.map((p) => (
            <div
              key={p.titulo}
              className="bg-gradient-to-br from-gray-900/90 to-black/80 ring-1 ring-white/10 rounded-2xl p-7 sm:p-8"
            >
              <div className="h-12 w-12 rounded-xl bg-red-500/15 ring-1 ring-red-500/30 flex items-center justify-center mb-5">
                {p.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold leading-snug">{p.titulo}</h3>
              <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed">{p.descripcion}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="#formulario-contacto"
            className="group inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-lg shadow-xl shadow-red-900/50 transition-all duration-300"
          >
            <span>Cotiza un esquema que cumpla</span>
            <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CumplimientoSection;
