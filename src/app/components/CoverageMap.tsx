// src/app/components/CoverageMap.tsx
//
// Mapa estático de cobertura del Valle de Toluca.
// - Tiles: CartoDB Dark Matter (free, OpenStreetMap data).
// - Librería: react-leaflet + leaflet.
// - Modo: sólo visual — sin drag, sin zoom, sin interacción.
// - Este componente NO debe renderizarse en SSR: leaflet accede a `window` al importar.
//   Debe cargarse via `next/dynamic({ ssr: false })` desde el padre.

'use client';

import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type Location = {
  name: string;
  sub?: string;
  coords: [number, number];
  type: 'city' | 'office';
};

const locations: Location[] = [
  { name: 'Toluca', coords: [19.2927, -99.6557], type: 'city' },
  { name: 'Metepec', coords: [19.2700, -99.6059], type: 'city' },
  { name: 'Lerma', coords: [19.2841, -99.5077], type: 'city' },
  { name: 'TSC · Oficina', sub: 'Cerca del Aeropuerto de Toluca', coords: [19.3322, -99.5886], type: 'office' },
];

// Centro aproximado que encuadra las 4 ubicaciones
const CENTER: [number, number] = [19.302, -99.58];
const ZOOM = 11;

export default function CoverageMap() {
  return (
    <MapContainer
      center={CENTER}
      zoom={ZOOM}
      // Modo "solo visual": deshabilitar toda interacción
      dragging={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      touchZoom={false}
      zoomControl={false}
      keyboard={false}
      boxZoom={false}
      attributionControl={true}
      style={{ height: '100%', width: '100%' }}
      className="tsc-map"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />

      {locations.map((loc) => {
        const isOffice = loc.type === 'office';
        return (
          <CircleMarker
            key={loc.name}
            center={loc.coords}
            radius={isOffice ? 11 : 7}
            pathOptions={{
              color: isOffice ? '#fecaca' : '#9ca3af',
              fillColor: isOffice ? '#dc2626' : '#6b7280',
              fillOpacity: isOffice ? 0.95 : 0.8,
              weight: isOffice ? 2.5 : 1.5,
              className: isOffice ? 'tsc-map-office' : 'tsc-map-city',
            }}
            interactive={false}
          >
            <Tooltip
              permanent
              direction="top"
              offset={[0, isOffice ? -14 : -10]}
              className={isOffice ? 'tsc-map-label tsc-map-label--office' : 'tsc-map-label'}
            >
              <span className="tsc-map-label__name">{loc.name}</span>
              {loc.sub && <span className="tsc-map-label__sub">{loc.sub}</span>}
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
