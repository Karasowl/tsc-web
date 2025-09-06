import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [
      // Rewrites para las cotizaciones HTML (con y sin extensión)
      {
        source: '/cotizacion-:path([^.]+)(.html)?',
        destination: '/cotizaciones/cotizacion-:path.html',
      },
      {
        source: '/cotizacion(.html)?',
        destination: '/cotizaciones/cotizacion.html',
      },
      // Rewrites para recursos CSS
      {
        source: '/css/:path*',
        destination: '/cotizaciones/css/:path*',
      },
      // Rewrites para FontAwesome
      {
        source: '/fontawesome/:path*',
        destination: '/cotizaciones/fontawesome/:path*',
      },
      // Rewrites para JavaScript
      {
        source: '/js/:path*',
        destination: '/cotizaciones/js/:path*',
      },
      // Rewrites para imágenes en cotizaciones
      {
        source: '/img/:path*',
        destination: '/cotizaciones/img/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/cotizaciones/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/html; charset=UTF-8',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
