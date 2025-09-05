// src/components/ServicesSection.tsx

"use client"; // Necesario para la interactividad (useState)

import { useState } from 'react';
import Image from 'next/image';
import { useI18n } from '../i18n/I18nContext';

const ServicesSection = () => {
  const { t } = useI18n();
  // Estado para controlar qué servicio está expandido. Guardamos el 'id' del servicio.
  const [expandedService, setExpandedService] = useState<string | null>(null);
  
  // Datos de los servicios con keys de traducción
  const servicesData = [
    {
      id: 'seguridad-industrial',
      titleKey: 'services.industrial.titulo',
      initialDescKey: 'services.industrial.descripcionInicial',
      moreDescKey: 'services.industrial.descripcionCompleta',
      imageSrc: '/img/Services/segindustrial.jpeg',
      imageAlt: 'Guardia de seguridad industrial inspeccionando un camión'
    },
    {
      id: 'custodias',
      titleKey: 'services.custodia.titulo',
      initialDescKey: 'services.custodia.descripcionInicial',
      moreDescKey: 'services.custodia.descripcionCompleta',
      imageSrc: '/img/Services/custodia2.webp',
      imageAlt: 'Vehículo de custodia en carretera'
    },
    {
      id: 'proteccion-ejecutiva',
      titleKey: 'services.ejecutiva.titulo',
      initialDescKey: 'services.ejecutiva.descripcionInicial',
      moreDescKey: 'services.ejecutiva.descripcionCompleta',
      imageSrc: '/img/Services/peje.jpeg',
      imageAlt: 'Guardaespaldas protegiendo a un ejecutivo'
    },
    {
      id: 'seguridad-tecnologica',
      titleKey: 'services.tecnologica.titulo',
      initialDescKey: 'services.tecnologica.descripcionInicial',
      moreDescKey: 'services.tecnologica.descripcionCompleta',
      imageSrc: '/img/Services/telemetria.webp',
      imageAlt: 'Monitor con cámaras de seguridad y datos de telemetría'
    },
  ];

  const handleToggle = (serviceId: string) => {
    // Si el servicio ya está abierto, lo cerramos. Si no, lo abrimos.
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <section id="services" className="bg-black text-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        {/* Título y descripción de la sección */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t('services.titulo')}
          </h2>
          <p className="mt-6 text-lg leading-7 text-gray-300">
            {t('services.subtitulo')}
          </p>
        </div>

        {/* Lista de servicios */}
        <div className="space-y-16">
          {servicesData.map((service, index) => {
            const isExpanded = expandedService === service.id;
            // Alternar el layout: par (0, 2...) a la izquierda, impar (1, 3...) a la derecha
            const isReversed = index % 2 !== 0;

            return (
              <div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}
              >
                {/* Columna de Texto */}
                <div className={`space-y-4 ${isReversed ? 'lg:col-start-2' : ''}`}>
                  <h3 className="text-2xl font-bold">{t(service.titleKey)}</h3>
                  <p className="text-gray-400 leading-relaxed">{t(service.initialDescKey)}</p>
                  
                  {/* Contenido expandible con animación */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-gray-400 leading-relaxed mt-4">{t(service.moreDescKey)}</p>
                  </div>

                  <button
                    onClick={() => handleToggle(service.id)}
                    className="bg-red-800/50 text-red-300 hover:bg-red-800/80 hover:text-white font-semibold py-2 px-4 rounded-md transition-colors text-sm"
                  >
                    {isExpanded ? t('services.mostrarMenos') : t('services.mostrarMas')}
                  </button>
                </div>

                {/* Columna de Imagen */}
                <div className={`rounded-lg overflow-hidden filter grayscale hover:grayscale-0 transition-all duration-300 ${isReversed ? 'lg:col-start-1' : ''}`}>
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;