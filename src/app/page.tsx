// src/app/page.tsx

import Header from '@/app/components/Header';
import Hero from '@/app/components/Hero';
import AboutSection from './components/AboutSection';
import CtaSection from './components/CtaSection';
import ContactSection from './components/ContactSection';
import ClientsSection from './components/ClientsSection';
import GallerySection from './components/GallerySection';
import OperationsSection from './components/OperationsSection';
import ServicesSection from './components/ServicesSection';
// import TestimonialsSection from './components/TestimonialsSection';
// ^ Oculta temporalmente: los testimonios actuales son de empleados y el subtítulo
//   dice "Opiniones reales de nuestros clientes" — incoherente para landing B2B.
//   Restaurar cuando el cliente provea testimonios reales de empresas clientes.
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <main className="bg-gray-900">
      <Header />
      <Hero />
      <AboutSection />
      <CtaSection />
      <ContactSection />
      <ClientsSection />
      <GallerySection />

      <OperationsSection />
      <ServicesSection />

      {/* <TestimonialsSection /> */}
      <Footer />
    </main>
  );
}