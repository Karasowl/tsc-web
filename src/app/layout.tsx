import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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
  title: "TSC Seguridad Privada - Protección Total",
  description: "Soluciones expertas en seguridad privada, custodia de mercancías y protección ejecutiva. Personal certificado con registro REPSE.",
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
        <I18nProvider>
          <FloatingButtons />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
