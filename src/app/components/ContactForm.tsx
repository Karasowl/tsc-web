// src/components/ContactForm.tsx

"use client"; // Este componente es interactivo, por lo que debe ser un Client Component

import { useState, FormEvent } from 'react';
import { useI18n } from '../i18n/I18nContext';

const ContactForm = () => {
  const { t } = useI18n();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xnnvdqdo", {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        // Opcional: Redirigir a una página de agradecimiento
        // window.location.href = '/thankyou'; 
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Algo salió mal.");
      }
    } catch {
      setStatus('error');
      setErrorMessage(t('contactForm.error'));
    }
  };

  return (
    <div className="bg-gray-800/50 ring-1 ring-white/10 p-8 rounded-xl shadow-lg w-full">
      <h3 className="text-2xl font-bold text-center">{t('contactForm.titulo')}</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-300 mb-1">{t('contactForm.nombre')} *</label>
            <input type="text" id="nombre" name="nombre" placeholder={t('contactForm.nombrePlaceholder')} required className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">{t('contactForm.email')} *</label>
            <input type="email" id="email" name="email" placeholder={t('contactForm.emailPlaceholder')} required className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
        </div>
        <div>
          <label htmlFor="empresa" className="block text-sm font-medium text-gray-300 mb-1">{t('contactForm.empresa')}</label>
          <input type="text" id="empresa" name="empresa" placeholder={t('contactForm.empresaPlaceholder')} className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-300 mb-1">{t('contactForm.telefono')} *</label>
          <input type="tel" id="telefono" name="telefono" placeholder={t('contactForm.telefonoPlaceholder')} pattern="[0-9]{10}" required className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div>
          <label htmlFor="comentarios" className="block text-sm font-medium text-gray-300 mb-1">{t('contactForm.mensaje')}</label>
          <textarea id="comentarios" name="comentarios" placeholder={t('contactForm.mensajePlaceholder')} rows={4} className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"></textarea>
        </div>
        <div>
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-md transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? t('contactForm.enviando') : t('contactForm.enviar')}
          </button>
        </div>
        {status === 'success' && <p className="text-green-400 text-center">{t('contactForm.exito')}</p>}
        {status === 'error' && <p className="text-red-400 text-center">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default ContactForm;