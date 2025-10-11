"use client";

import { MapContainer, TileLayer, CircleMarker, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';

interface MapPickerProps {
    onLocationSelect: (location: { lat: number; lng: number }) => void;
    selectedLocation: { lat: number; lng: number } | null; // Nueva prop para recibir la ubicación
}

// Componente para manejar el clic en el mapa
const MapClickHandler = ({ onLocationSelect }: { onLocationSelect: (loc: L.LatLng) => void }) => {
    useMapEvents({
        click(e) {
            onLocationSelect(e.latlng);
        },
    });
    return null;
};

// Componente para centrar el mapa cuando la ubicación cambia desde la búsqueda
const ChangeView = ({ center, zoom }: { center: LatLngExpression, zoom: number }) => {
    const map = useMap();
    map.flyTo(center, zoom);
    return null;
}

const MapPicker = ({ onLocationSelect, selectedLocation }: MapPickerProps) => {
    const initialPosition: LatLngExpression = [4.8133, -75.6961];
    
    const redCircleOptions = {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
    };

    return (
        <MapContainer center={initialPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
            {/* Si hay una ubicación seleccionada, centramos el mapa en ella */}
            {selectedLocation && <ChangeView center={selectedLocation} zoom={16} />}

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler onLocationSelect={onLocationSelect} />
            
            {/* El marcador siempre se mostrará en la ubicación seleccionada */}
            {selectedLocation && (
                <CircleMarker
                    center={selectedLocation}
                    pathOptions={redCircleOptions}
                    radius={10} 
                />
            )}
        </MapContainer>
    );
};

export default MapPicker;