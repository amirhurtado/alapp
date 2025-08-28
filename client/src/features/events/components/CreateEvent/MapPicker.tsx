"use client";

import { MapContainer, TileLayer, CircleMarker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';
import { useState } from 'react';


interface MapPickerProps {
    onLocationSelect: (location: { lat: number; lng: number }) => void;
}

const LocationMarker = ({ onLocationSelect }: MapPickerProps) => {
    const [position, setPosition] = useState<L.LatLng | null>(null);

    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            onLocationSelect(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    const redCircleOptions = {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
    };

    return position === null ? null : (
        <CircleMarker
            center={position}
            pathOptions={redCircleOptions}
            radius={10} 
        />
    );
};

const MapPicker = ({ onLocationSelect }: MapPickerProps) => {
    const initialPosition: LatLngExpression = [4.8133, -75.6961];

    return (
        <MapContainer center={initialPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker onLocationSelect={onLocationSelect} />
        </MapContainer>
    );
};

export default MapPicker;