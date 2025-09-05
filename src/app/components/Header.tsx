// src/components/Header.tsx

"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import { useI18n } from '../i18n/I18nContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useI18n();

  const navLinks = [
    { key: 'header.inicio', href: '#inicio' },
    { key: 'header.nosotros', href: '#work' },
    { key: 'header.servicios', href: '#services' },
  ];

  return (
    <header className="header-area header fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
      <div id="header-sticky" className="menu-area">
        <div className="container-fluid px-4 lg:px-8">
          <div className="second-menu">
            <div className="flex items-center justify-between py-3">
              
              {/* Logo - Col 1 */}
              <div className="w-auto lg:w-2/12">
                <div className="logo">
                  <Link href="/">
                    <Image 
                      src="/img/logo peque-02.png" 
                      alt="logo" 
                      width={100} 
                      height={38}
                      priority
                    />
                  </Link>
                </div>
              </div>

              {/* Main Menu - Col 2 */}
              <div className="w-auto lg:w-4/12 hidden lg:block">
                <div className="main-menu">
                  <nav id="mobile-menu">
                    <ul className="flex items-center space-x-6">
                      {navLinks.map((link) => (
                        <li key={link.key} className="has-sub">
                          <Link 
                            href={link.href} 
                            className="text-white hover:text-red-500 transition-colors font-medium"
                          >
                            {t(link.key)}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <a 
                          href="https://api.whatsapp.com/send/?phone=5217291068887&text=%C2%A1Hola!%20Solicito%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20seguridad%20privada."
                          className="boton-principal-moderno bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-md inline-flex items-center transition-all duration-300 transform hover:scale-105"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaWhatsapp className="mr-2 text-lg" />
                          {t('header.contactanos')}
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>

              {/* Header CTA - Col 3 */}
              <div className="w-auto lg:w-6/12 hidden lg:block">
                <div className="header-cta">
                  <ul className="flex items-center justify-end space-x-6">
                    <li>
                      <div className="call-box">
                        <div className="text text-right text-white">
                          <div className="font-bold text-lg">Tel: 729 106 8887</div>
                          <div className="text-sm text-gray-300">TSC Seguridad Privada</div>
                        </div>
                      </div>
                    </li>
                    <li>
                      {/* Selector de idiomas */}
                      <div className="header-language-selector flex space-x-2">
                        <button 
                          className={`lang-btn px-3 py-1 rounded ${language === 'es' ? 'bg-red-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'} transition-colors`}
                          title="Español"
                          onClick={() => setLanguage('es')}
                        >
                          ES
                        </button>
                        <button 
                          className={`lang-btn px-3 py-1 rounded ${language === 'en' ? 'bg-red-700 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'} transition-colors`}
                          title="English"
                          onClick={() => setLanguage('en')}
                        >
                          EN
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)} 
                  aria-label="Toggle menu"
                  className="text-white p-2"
                >
                  {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black/95 absolute top-full left-0 w-full">
          <nav className="flex flex-col items-center space-y-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-lg text-white hover:text-red-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t(link.key)}
              </Link>
            ))}
            <a
              href="https://api.whatsapp.com/send/?phone=5217291068887&text=%C2%A1Hola!%20Solicito%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios%20de%20seguridad%20privada."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-md flex items-center transition-colors mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaWhatsapp className="mr-2" />
              {t('header.contactanos')}
            </a>
            <div className="text-center text-white mt-4">
              <div className="font-bold">Tel: 729 106 8887</div>
              <div className="text-sm text-gray-400">TSC Seguridad Privada</div>
            </div>
            {/* Mobile Language Selector */}
            <div className="flex space-x-2 mt-4">
              <button 
                className={`px-3 py-1 rounded ${language === 'es' ? 'bg-red-700 text-white' : 'bg-gray-700 text-gray-300'}`}
                onClick={() => setLanguage('es')}
              >
                ES
              </button>
              <button 
                className={`px-3 py-1 rounded ${language === 'en' ? 'bg-red-700 text-white' : 'bg-gray-700 text-gray-300'}`}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;