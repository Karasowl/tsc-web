// src/components/ServicesSection.tsx

"use client";

import { useState } from 'react';
import Image from 'next/image';
import { FaUserShield, FaIndustry, FaBuilding, FaIdCard, FaArrowRight, FaCheck } from 'react-icons/fa';
import { useI18n } from '../i18n/I18nContext';

type Bullet = string;

type ServiceCard = {
  id: string;
  titleKey: string;
  initialDescKey: string;
  moreDescKey: string;
  imageSrc: string;
  imageAlt: string;
  icon: React.ReactNode;
  bullets: Bullet[];
  featured?: boolean;
};

const ServicesSection = () => {
  const { t } = useI18n();
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const servicesData: ServiceCard[] = [
    {
      id: 'guardias-intramuros',
      titleKey: 'services.intramuros.titulo',
      initialDescKey: 'services.intramuros.descripcionInicial',
      moreDescKey: 'services.intramuros.descripcionCompleta',
      imageSrc: '/img/Services/segindustrial.jpeg',
      imageAlt: 'Guardia de seguridad intramuros en planta industrial en Toluca',
      icon: <FaUserShield className="text-red-400 text-2xl" />,
      bullets: [
        'REPSE vigente · STPS',
        'Personal capacitado y supervisado',
        'Turnos 24/7 con relevos puntuales',
        'Bitácoras digitales y reportes',
      ],
      featured: true,
    },
    {
      id: 'vigilancia-industrial',
      titleKey: 'services.industrial.titulo',
      initialDescKey: 'services.industrial.descripcionInicial',
      moreDescKey: 'services.industrial.descripcionCompleta',
      imageSrc: '/img/Services/custodia2.webp',
      imageAlt: 'Vigilancia industrial para bodegas y naves en el Valle de Toluca',
      icon: <FaIndustry className="text-red-400 text-2xl" />,
      bullets: [
        'Naves industriales y bodegas',
        'Inspección de vehículos y carga',
        'CCTV y control perimetral',
      ],
    },
    {
      id: 'seguridad-corporativa',
      titleKey: 'services.corporativa.titulo',
      initialDescKey: 'services.corporativa.descripcionInicial',
      moreDescKey: 'services.corporativa.descripcionCompleta',
      imageSrc: '/img/Services/peje.jpeg',
      imageAlt: 'Guardia de seguridad en edificio corporativo en Toluca',
      icon: <FaBuilding className="text-red-400 text-2xl" />,
      bullets: [
        'Recepción y atención al visitante',
        'Protocolos corporativos',
        'Imagen profesional',
      ],
    },
    {
      id: 'control-acceso',
      titleKey: 'services.accesos.titulo',
      initialDescKey: 'services.accesos.descripcionInicial',
      moreDescKey: 'services.accesos.descripcionCompleta',
      imageSrc: '/img/Services/telemetria.webp',
      imageAlt: 'Sistema de control de acceso y supervisión 24/7',
      icon: <FaIdCard className="text-red-400 text-2xl" />,
      bullets: [
        'Control de personas y vehículos',
        'Registro digital y bitácoras',
        'Supervisión 24/7',
      ],
    },
  ];

  const handleToggle = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const featured = servicesData.find((s) => s.featured)!;
  const others = servicesData.filter((s) => !s.featured);

  return (
    <section
      id="services"
      className="relative bg-black text-white py-24 sm:py-32 overflow-hidden"
    >
      {/* Glow de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-red-400 mb-4">
            Soluciones para Empresas
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {t('services.titulo')}
          </h2>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-gray-300">
            {t('services.subtitulo')}
          </p>
        </div>

        {/* Bento grid: 1 card destacada + 3 secundarias */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* CARD DESTACADA */}
          <FeaturedCard
            service={featured}
            expanded={expandedService === featured.id}
            onToggle={() => handleToggle(featured.id)}
            t={t}
          />

          {/* CARDS SECUNDARIAS */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {others.map((service) => (
              <SecondaryCard
                key={service.id}
                service={service}
                expanded={expandedService === service.id}
                onToggle={() => handleToggle(service.id)}
                t={t}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ===== Card destacada (ocupa toda la columna izquierda) ===== */
type CardProps = {
  service: ServiceCard;
  expanded: boolean;
  onToggle: () => void;
  t: (key: string) => string;
};

const FeaturedCard = ({ service, expanded, onToggle, t }: CardProps) => (
  <div className="group relative lg:row-span-1 rounded-2xl overflow-hidden ring-1 ring-white/10 bg-gradient-to-br from-red-950/40 via-gray-900/60 to-black backdrop-blur-md transition-all duration-500 hover:ring-red-500/50 hover:-translate-y-1 flex flex-col">
    {/* Imagen superior con overlay */}
    <div className="relative h-48 sm:h-56 overflow-hidden">
      <Image
        src={service.imageSrc}
        alt={service.imageAlt}
        fill
        className="object-cover filter grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      {/* Badge destacado */}
      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/90 backdrop-blur-sm">
        <span className="text-[10px] font-bold uppercase tracking-wider text-white">
          Servicio Principal
        </span>
      </div>
    </div>

    {/* Contenido */}
    <div className="p-6 sm:p-8 flex flex-col flex-grow">
      <div className="flex items-center gap-3 mb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/15 ring-1 ring-red-500/30">
          {service.icon}
        </div>
      </div>

      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
        {t(service.titleKey)}
      </h3>
      <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
        {t(service.initialDescKey)}
      </p>

      {/* Bullets con checks */}
      <ul className="mt-6 space-y-2.5">
        {service.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-sm text-gray-200">
            <FaCheck className="text-red-500 mt-1 flex-shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* Expansión */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          expanded ? 'max-h-96 opacity-100 mt-5' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-400 leading-relaxed text-sm">
          {t(service.moreDescKey)}
        </p>
      </div>

      {/* Footer con CTA + toggle */}
      <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between gap-3">
        <button
          onClick={onToggle}
          className="text-sm font-semibold text-red-300 hover:text-red-200 transition-colors"
        >
          {expanded ? t('services.mostrarMenos') : t('services.mostrarMas')}
        </button>
        <a
          href="#formulario-contacto"
          className="group/cta inline-flex items-center gap-2 text-sm font-bold text-white bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg transition-colors"
        >
          Cotizar
          <FaArrowRight className="text-xs transition-transform group-hover/cta:translate-x-0.5" />
        </a>
      </div>
    </div>
  </div>
);

/* ===== Card secundaria ===== */
const SecondaryCard = ({ service, expanded, onToggle, t }: CardProps) => (
  <div className="group relative rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/[0.03] backdrop-blur-md transition-all duration-300 hover:ring-red-500/50 hover:bg-white/[0.05] hover:-translate-y-1 flex flex-col">
    <div className="p-6 sm:p-7 flex flex-col flex-grow">
      {/* Icono */}
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 ring-1 ring-red-500/30 mb-5 group-hover:bg-red-500/20 group-hover:ring-red-500/60 transition-all duration-300">
        {service.icon}
      </div>

      <h3 className="text-xl font-bold text-white mb-2 leading-tight">
        {t(service.titleKey)}
      </h3>
      <p className="text-gray-400 leading-relaxed text-sm flex-grow">
        {t(service.initialDescKey)}
      </p>

      {/* Bullets */}
      <ul className="mt-4 space-y-2">
        {service.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
            <FaCheck className="text-red-500 mt-0.5 flex-shrink-0 text-[10px]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* Expansión */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          expanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-400 leading-relaxed text-xs sm:text-sm">
          {t(service.moreDescKey)}
        </p>
      </div>

      <button
        onClick={onToggle}
        className="mt-5 text-xs font-semibold text-red-300 hover:text-red-200 transition-colors self-start"
      >
        {expanded ? t('services.mostrarMenos') : `${t('services.mostrarMas')} →`}
      </button>
    </div>
  </div>
);

export default ServicesSection;
