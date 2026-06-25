// src/app/thankyou/page.tsx

import Link from 'next/link';
import { FaCheckCircle, FaWhatsapp, FaHome } from 'react-icons/fa';
import TrackedLeadLink from '@/app/components/TrackedLeadLink';

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center space-y-8">

        {/* Icono de éxito */}
        <div className="flex justify-center">
          <div className="bg-green-500/10 ring-1 ring-green-500/30 rounded-full p-8">
            <FaCheckCircle className="text-green-500 text-6xl" />
          </div>
        </div>

        {/* Título */}
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          ¡Gracias por contactarnos!
        </h1>

        {/* Descripción */}
        <div className="space-y-4">
          <p className="text-xl text-gray-300">
            Hemos recibido tu solicitud y nos pondremos en contacto contigo a la brevedad.
          </p>
          <p className="text-lg text-gray-400">
            Un asesor de <span className="text-red-500 font-semibold">TSC Seguridad Privada</span> se comunicará contigo en las próximas <span className="font-semibold">24 horas</span> para brindarte una cotización personalizada.
          </p>
        </div>

        {/* Información adicional */}
        <div className="bg-gray-800/50 ring-1 ring-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-3">¿Necesitas atención inmediata?</h3>
          <p className="text-gray-400 mb-4">
            Si tu solicitud es urgente, contáctanos directamente por WhatsApp
          </p>
          <TrackedLeadLink
            channel="whatsapp"
            placement="thankyou_whatsapp"
            href="https://api.whatsapp.com/send/?phone=5217291068887&text=%C2%A1Hola!%20Acabo%20de%20enviar%20el%20formulario%20y%20necesito%20atenci%C3%B3n%20inmediata."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            <FaWhatsapp className="text-2xl" />
            Contactar por WhatsApp
          </TrackedLeadLink>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            <FaHome />
            Volver al Inicio
          </Link>
        </div>

        {/* Pie de nota */}
        <p className="text-sm text-gray-500 pt-8">
          Revisa tu bandeja de entrada (y spam) para más información
        </p>
      </div>
    </main>
  );
}
