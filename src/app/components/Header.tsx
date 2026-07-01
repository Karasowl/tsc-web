// src/components/Header.tsx

"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { FiMenu, FiX, FiHome, FiUsers, FiShield, FiChevronRight } from 'react-icons/fi';
import TrackedLeadLink from '@/app/components/TrackedLeadLink';
import { useI18n } from '../i18n/I18nContext';

type NavLink = {
  key: string;
  href: string;
  icon: React.ReactNode;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useI18n();

  const navLinks: NavLink[] = [
    { key: 'header.inicio', href: '#inicio', icon: <FiHome /> },
    { key: 'header.nosotros', href: '#work', icon: <FiUsers /> },
    { key: 'header.servicios', href: '#services', icon: <FiShield /> },
  ];

  // Lock del scroll del body cuando el menú mobile está abierto
  useEffect(() => {
    if (isMenuOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [isMenuOpen]);

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="container-fluid px-4 lg:px-8">
          <div className="flex items-center justify-between py-3">

            {/* Logo */}
            <div className="w-auto lg:w-2/12">
              <Link href="/" className="inline-block">
                <Image
                  src="/img/logo peque-02.png"
                  alt="TSC Seguridad Privada"
                  width={100}
                  height={38}
                  priority
                />
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex lg:w-4/12">
              <nav>
                <ul className="flex items-center gap-6">
                  {navLinks.map((link) => (
                    <li key={link.key}>
                      <Link
                        href={link.href}
                        className="text-white/90 hover:text-white text-sm font-medium tracking-wide transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-red-500 after:transition-all after:duration-300"
                      >
                        {t(link.key)}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <TrackedLeadLink
                      channel="whatsapp"
                      placement="header_desktop_whatsapp"
                      href="https://api.whatsapp.com/send/?phone=5217291068887&text=%C2%A1Hola%21%20Quisiera%20contratar%20servicios%20de%20seguridad%20privada"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg shadow-red-900/40 hover:shadow-red-700/50 hover:scale-[1.03] transition-all duration-300 text-sm"
                    >
                      <FaWhatsapp className="text-base" />
                      {t('header.contactanos')}
                    </TrackedLeadLink>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Desktop CTA + Lang */}
            <div className="hidden lg:flex lg:w-6/12">
              <ul className="flex items-center justify-end gap-6 w-full">
                <li>
                  <div className="text-right">
                    <div className="font-bold text-base text-white leading-tight">
                      Tel: <TrackedLeadLink channel="phone" placement="header_desktop_phone" href="tel:+527291068887" className="hover:text-red-400 transition-colors">729 106 8887</TrackedLeadLink>
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">TSC Seguridad Privada</div>
                  </div>
                </li>
                <li>
                  {/* Selector de idiomas */}
                  <div className="flex gap-1 p-1 bg-white/5 ring-1 ring-white/10 rounded-lg">
                    <button
                      className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                        language === 'es'
                          ? 'bg-red-600 text-white shadow'
                          : 'text-gray-400 hover:text-white'
                      }`}
                      title="Español"
                      onClick={() => setLanguage('es')}
                    >
                      ES
                    </button>
                    <button
                      className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                        language === 'en'
                          ? 'bg-red-600 text-white shadow'
                          : 'text-gray-400 hover:text-white'
                      }`}
                      title="English"
                      onClick={() => setLanguage('en')}
                    >
                      EN
                    </button>
                  </div>
                </li>
              </ul>
            </div>

            {/* Mobile toggle button — icon cross-fade animation */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu-panel"
                className="relative w-11 h-11 rounded-full bg-white/5 ring-1 ring-white/10 hover:ring-red-500/40 hover:bg-red-500/10 transition-all flex items-center justify-center"
              >
                <FiMenu
                  size={22}
                  className={`absolute text-white transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <FiX
                  size={22}
                  className={`absolute text-white transition-all duration-300 ${
                    isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                  }`}
                />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ===== Mobile Menu Overlay — full-screen con animación ===== */}
      <div
        id="mobile-menu-panel"
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ease-out ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto visible'
            : 'opacity-0 pointer-events-none invisible'
        }`}
        aria-hidden={!isMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal"
      >
        {/* Backdrop con blur */}
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
          onClick={closeMenu}
        />

        {/* Glow rojo decorativo */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.15),transparent_60%)] pointer-events-none" />

        {/* Panel de contenido */}
        <div
          className={`relative h-full flex flex-col overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          {/* Top bar con logo + close (replica espacio del header) */}
          <div className="flex items-center justify-between py-3 px-4 border-b border-white/10 bg-black/40 backdrop-blur-md">
            <Link href="/" onClick={closeMenu}>
              <Image
                src="/img/logo peque-02.png"
                alt="TSC"
                width={100}
                height={38}
                priority
              />
            </Link>
            <button
              onClick={closeMenu}
              aria-label="Cerrar menú"
              className="w-11 h-11 rounded-full bg-white/5 ring-1 ring-white/10 hover:ring-red-500/40 hover:bg-red-500/10 flex items-center justify-center transition-all"
            >
              <FiX size={22} className="text-white" />
            </button>
          </div>

          {/* Nav links con stagger */}
          <nav className="flex-1 px-6 py-8">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-red-400 mb-4 px-1">
              Navegación
            </span>
            <ul className="space-y-2.5">
              {navLinks.map((link, index) => (
                <li
                  key={link.key}
                  className="transition-all duration-500"
                  style={{
                    transitionDelay: isMenuOpen ? `${120 + index * 70}ms` : '0ms',
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? 'translateY(0)' : 'translateY(12px)',
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="group flex items-center justify-between px-5 py-4 rounded-xl bg-white/[0.03] ring-1 ring-white/10 hover:ring-red-500/50 hover:bg-white/[0.06] transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-red-500/10 ring-1 ring-red-500/30 text-red-400 text-lg group-hover:bg-red-500/20 group-hover:ring-red-500/60 transition-all">
                        {link.icon}
                      </span>
                      <span className="text-base font-semibold text-white">
                        {t(link.key)}
                      </span>
                    </div>
                    <FiChevronRight className="text-gray-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA WhatsApp */}
            <div
              className="mt-8 transition-all duration-500"
              style={{
                transitionDelay: isMenuOpen ? `${120 + navLinks.length * 70}ms` : '0ms',
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(12px)',
              }}
            >
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-red-400 mb-3 px-1">
                Contacto directo
              </span>
              <TrackedLeadLink
                channel="whatsapp"
                placement="header_mobile_whatsapp"
                href="https://api.whatsapp.com/send/?phone=5217291068887&text=%C2%A1Hola%21%20Quisiera%20contratar%20servicios%20de%20seguridad%20privada"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="group flex items-center justify-center gap-3 w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-4 px-6 rounded-xl shadow-xl shadow-red-900/50 transition-all"
              >
                <FaWhatsapp className="text-2xl" />
                <span>{t('header.contactanos')}</span>
              </TrackedLeadLink>
            </div>

            {/* Language selector */}
            <div
              className="mt-8 transition-all duration-500"
              style={{
                transitionDelay: isMenuOpen ? `${120 + (navLinks.length + 1) * 70}ms` : '0ms',
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(12px)',
              }}
            >
              <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-red-400 mb-3 px-1">
                Idioma
              </span>
              <div className="flex gap-2 p-1 bg-white/5 ring-1 ring-white/10 rounded-xl">
                <button
                  onClick={() => setLanguage('es')}
                  className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    language === 'es'
                      ? 'bg-red-600 text-white shadow-lg shadow-red-900/50'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Español
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    language === 'en'
                      ? 'bg-red-600 text-white shadow-lg shadow-red-900/50'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </nav>

          {/* Footer del menú: info de contacto */}
          <div
            className="p-6 border-t border-white/10 bg-black/50 transition-all duration-500"
            style={{
              transitionDelay: isMenuOpen ? `${120 + (navLinks.length + 2) * 70}ms` : '0ms',
              opacity: isMenuOpen ? 1 : 0,
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-red-500/10 ring-1 ring-red-500/30 text-red-400">
                <FaPhoneAlt className="text-sm" />
              </span>
              <TrackedLeadLink
                channel="phone"
                placement="header_mobile_phone"
                href="tel:+527291068887"
                className="font-bold text-white hover:text-red-400 transition-colors"
              >
                729 106 8887
              </TrackedLeadLink>
            </div>
            <div className="flex items-start gap-3 text-gray-400 text-xs leading-relaxed">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-red-500/10 ring-1 ring-red-500/30 text-red-400 flex-shrink-0">
                <FaMapMarkerAlt className="text-sm" />
              </span>
              <span className="pt-2">
                BLVD. Miguel Alemán 307, San Mateo Otzacatipan, Toluca · Cerca del Aeropuerto
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
