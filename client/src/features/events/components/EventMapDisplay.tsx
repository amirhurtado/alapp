"use client";

import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';

interface EventMapDisplayProps {
  position: {
    lat: number;
    lng: number;
  };
}

const EventMapDisplay = ({ position }: EventMapDisplayProps) => {
  const mapPosition: LatLngExpression = [position.lat, position.lng];

  const redCircleOptions = {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
  };

  if (!position.lat || !position.lng) {
    return <div>Ubicación no disponible.</div>;
  }

  return (
    <MapContainer 
      center={mapPosition} 
      zoom={15} 
      style={{ height: '100%', width: '100%' }}

    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CircleMarker
        center={mapPosition}
        pathOptions={redCircleOptions}
        radius={10}
      />
    </MapContainer>
  );
};

export default EventMapDisplay;