// src/components/ContactForm.tsx

"use client";

import { useState, FormEvent } from 'react';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
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
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        window.location.href = '/thankyou.html';
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
    <div className="relative">
      {/* Glow externo */}
      <div className="absolute -inset-1 bg-gradient-to-br from-red-600/30 via-red-500/10 to-red-900/20 rounded-2xl blur-2xl opacity-70 -z-10" />

      <div className="bg-gradient-to-br from-gray-900/90 to-black/80 backdrop-blur-xl ring-1 ring-white/10 p-8 sm:p-10 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-red-500/15 ring-1 ring-red-500/30 flex items-center justify-center">
            <FaCheckCircle className="text-red-400" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {t('contactForm.titulo')}
            </h3>
            <p className="text-xs text-gray-400">
              Respuesta rápida · Sin compromiso
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre + Correo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="nombre" className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                {t('contactForm.nombre')} *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder={t('contactForm.nombrePlaceholder')}
                required
                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/60 focus:border-red-500/60 transition-all"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                {t('contactForm.email')} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={t('contactForm.emailPlaceholder')}
                required
                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/60 focus:border-red-500/60 transition-all"
              />
            </div>
          </div>

          {/* Empresa */}
          <div>
            <label htmlFor="empresa" className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
              {t('contactForm.empresa')}
            </label>
            <input
              type="text"
              id="empresa"
              name="empresa"
              placeholder={t('contactForm.empresaPlaceholder')}
              className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/60 focus:border-red-500/60 transition-all"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="telefono" className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
              {t('contactForm.telefono')} *
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              placeholder={t('contactForm.telefonoPlaceholder')}
              pattern="[0-9]{10}"
              required
              className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/60 focus:border-red-500/60 transition-all"
            />
          </div>

          {/* Mensaje */}
          <div>
            <label htmlFor="comentarios" className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
              {t('contactForm.mensaje')}
            </label>
            <textarea
              id="comentarios"
              name="comentarios"
              placeholder={t('contactForm.mensajePlaceholder')}
              rows={4}
              className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/60 focus:border-red-500/60 transition-all resize-none"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="group w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3.5 px-6 rounded-lg shadow-xl shadow-red-900/40 hover:shadow-red-700/60 hover:scale-[1.01] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <span>{status === 'loading' ? t('contactForm.enviando') : t('contactForm.enviar')}</span>
            {status !== 'loading' && (
              <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
            )}
          </button>

          {/* Mensajes */}
          {status === 'success' && (
            <p className="text-green-400 text-center text-sm font-semibold">
              {t('contactForm.exito')}
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-center text-sm font-semibold">
              {errorMessage}
            </p>
          )}

          <p className="text-[11px] text-gray-500 text-center">
            Al enviar aceptas el uso de tus datos para fines de contacto comercial.
          </p>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
