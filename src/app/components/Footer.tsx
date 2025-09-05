// src/components/Footer.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '../i18n/I18nContext';

const Footer = () => {
  const { t } = useI18n();
  return (
    <footer>
      {/* Footer Top */}
      <div 
        className="footer-top pt-32 pb-24 relative"
        style={{
          backgroundColor: '#161616',
          backgroundImage: 'url(/img/bg/footer_bg.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-between">
            
            {/* Logo e Info */}
            <div className="w-full lg:w-5/12 mb-8">
              <div className="footer-widget">
                <div className="f-widget-title mb-20">
                  <Image
                    src="/img/logo/tsc logo-06.png"
                    alt="Logo TSC"
                    width={200}
                    height={80}
                  />
                </div>
                <div className="info">
                  <ul className="space-y-3 text-gray-300">
                    <li>
                      <span className="red text-red-500 font-bold">{t('general.tel')}</span> 729 106 8887
                    </li>
                    <li>
                      <span className="red text-red-500 font-bold">{t('general.dir')}</span> BLVD. Miguel Alemán 307 Local 10, Colonia San Mateo Otzacatipan, CP. 50220, Toluca Edo. Méx.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Redes Sociales (espacio vacío por ahora) */}
            <div className="w-full lg:w-2/12 mb-8">
              <div className="footer-widget">
                {/* Aquí puedes agregar redes sociales si las necesitas */}
              </div>
            </div>

            {/* Aviso de Privacidad */}
            <div className="w-full lg:w-3/12 mb-8">
              <div className="footer-widget">
                <h2 className="f-widget-title text-white text-xl font-bold mb-4">
                  {t('general.aviso')}
                </h2>
                <div className="footer-link">
                  <ul>
                    <li>
                      <Link 
                        href="/aviso-privacidad" 
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        {t('header.avisoPrivacidad')}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
          
          {/* Copyright dentro del footer */}
          <div className="w-full mt-12 pt-8 border-t border-gray-700">
            <div className="flex items-center">
              <div className="w-full text-gray-500">
                <span>
                  {t('general.copyright')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;