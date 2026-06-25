import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AttributionTracker from "@/app/components/AttributionTracker";
import FloatingButtons from "@/app/components/FloatingButtons";
import { I18nProvider } from "@/app/i18n/I18nContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Contrate Seguridad Privada en Toluca | TSC Seguridad Privada",
  description:
    "Contrate servicio de guardias intramuros y vigilancia privada en el Valle de Toluca, Metepec y Lerma. Empresa de seguridad privada con REPSE vigente. Cotice desde Toluca.",
  keywords: [
    "seguridad privada",
    "empresas seguridad privada",
    "servicio de seguridad privada",
    "guardias intramuros",
    "vigilancia privada",
    "contratar seguridad privada",
    "seguridad para empresas",
    "servicio de guardias de seguridad",
    "servicio de seguridad intramuros",
    "cotizar seguridad privada",
    "Toluca",
    "Metepec",
    "Lerma",
    "Valle de Toluca",
    "REPSE",
  ],
  alternates: {
    canonical: "https://guardias.tscseguridadprivada.com.mx/",
  },
  openGraph: {
    title: "Contrate Seguridad Privada en Toluca | TSC Seguridad Privada",
    description:
      "Contrate guardias intramuros y vigilancia privada en el Valle de Toluca, Metepec y Lerma. Cotice sin compromiso.",
    url: "https://guardias.tscseguridadprivada.com.mx/",
    siteName: "TSC Seguridad Privada",
    locale: "es_MX",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/img/cropped-fav-1.ico",
    shortcut: "/img/cropped-fav-1.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P9JTR8ZV');
          `}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P9JTR8ZV"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <I18nProvider>
          <AttributionTracker />
          <FloatingButtons />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
