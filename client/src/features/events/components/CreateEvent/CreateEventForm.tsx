"use client";
import { Captions, Info, Search, X } from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { Calendar } from "@/components/ui/calendar";
import { TimePicker } from "./TimePicker";
import Buttons from "./Buttons";
import { useCreateEventMutation } from "../../hooks/useCreateEventMutation";

interface CreateEventFormProps {
  groupId: number;
  onSuccess: () => void;
}

type Location = {
  lat: number;
  lng: number;
};

type SearchResult = {
  x: number;
  y: number;
  label: string;
  raw: {
    place_id: string;
    address?: {
      country?: string;
    };
    display_name?: string;
  };
};

type SearchProvider = {
  search: (params: { query: string }) => Promise<SearchResult[]>;
};

const CreateEventForm = ({ groupId, onSuccess }: CreateEventFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  const [location, setLocation] = useState<Location | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSelected, setHasSelected] = useState(false); // ✅ Nuevo estado para saber si ya seleccionó
  
  // Inicializar el provider solo en el cliente
  const [provider, setProvider] = useState<SearchProvider | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet-geosearch').then(({ OpenStreetMapProvider }) => {
        setProvider(new OpenStreetMapProvider());
      });
    }
  }, []);

  const onCreate = useCreateEventMutation(groupId);

  // Debounce para la búsqueda - Espera 500ms después de que el usuario deje de escribir
  useEffect(() => {
    if (!provider) return;

    const delaySearch = setTimeout(async () => {
      if (searchQuery.length > 2) {
        setIsSearching(true);
        try {
          // ✅ Agrega ", Colombia" automáticamente a la búsqueda
          const searchQueryWithCountry = `${searchQuery}, Colombia`;
          const results = await provider.search({ query: searchQueryWithCountry });
          
          // ✅ FILTRO ADICIONAL: Solo resultados que contengan "Colombia" en el país
          const colombiaResults = results.filter((result: SearchResult) => {
            const address = result.raw?.address || {};
            const country = address.country || result.raw?.display_name || '';
            return country.toLowerCase().includes('colombia') || 
                   country.toLowerCase().includes('co');
          });
          
          setSearchResults(colombiaResults);
        } catch (error) {
          console.error("Error en búsqueda:", error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    // Limpia el timeout si el usuario sigue escribiendo
    return () => clearTimeout(delaySearch);
  }, [searchQuery, provider]);

  const handleSelectResult = (result: SearchResult) => {
    const newLocation = { lat: result.y, lng: result.x };
    setLocation(newLocation);
    setSearchQuery(result.label);
    setSearchResults([]); // Limpiar resultados inmediatamente
    setHasSelected(true); // ✅ Marcar que ya seleccionó
  };

  // ✅ Función para limpiar el input
  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setLocation(null);
    setHasSelected(false);
  };

  // Cargar MapPicker dinámicamente solo en el cliente
  const MapPicker = useMemo(
    () =>
      dynamic(
        () => import("@/features/events/components/CreateEvent/MapPicker"),
        {
          ssr: false,
          loading: () => <p className="text-center">Cargando mapa...</p>,
        }
      ),
    []
  );

  return (
    <form
      className="mt-4 flex flex-col gap-6"
      action={async (formData) => {
        onCreate.mutate({ formData });
        onSuccess();
      }}
    >
      <input type="hidden" name="groupId" value={groupId} />
      
      {/* Campo: Nombre del evento */}
      <div className="flex items-start flex-col gap-1">
        <p className="text-xs">Nombre del evento</p>
        <div className="relative">
          <input 
            type="text" 
            name="title" 
            value={title} 
            placeholder="Titulo del evento" 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-[16rem] md:w-[18rem] border-b rounded-lg bg-input py-2 pr-3 pl-10 font-poppins text-sm text-text-gray" 
          />
          <Captions 
            strokeWidth={1} 
            size={20} 
            className="absolute left-2 top-1/2 -translate-y-[50%] text-text-gray" 
          />
        </div>
      </div>

      {/* Campo: Descripción */}
      <div className="flex items-start flex-col gap-1">
        <p className="text-xs">Descripción</p>
        <div className="relative">
          <input 
            type="text" 
            name="description" 
            value={description} 
            placeholder="Descripción" 
            onChange={(e) => setDescription(e.target.value)} 
            className="w-[16rem] md:w-[18rem] border-b rounded-lg bg-input py-2 pr-3 pl-10 font-poppins text-sm text-text-gray"
          />
          <Info 
            strokeWidth={1} 
            size={20} 
            className="absolute left-2 top-1/2 -translate-y-[50%] text-text-gray"
          />
        </div>
      </div>

      {/* Sección: Fecha/Hora y Ubicación */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-10">
        
        {/* Fecha y Hora */}
        <div className="flex flex-col gap-2">
          <div className="flex items-start flex-col gap-1">
            <p className="text-xs">Fecha</p>
            <Calendar 
              mode="single" 
              selected={date} 
              onSelect={setDate} 
              className="rounded-lg border" 
              disabled={(date) => date < new Date()}
            />
            <input 
              type="hidden" 
              name="date" 
              value={date ? date.toISOString() : ""}
            />
          </div>
          <TimePicker date={date} setDate={setDate} />
        </div>

        {/* Ubicación */}
        <div className="flex items-start flex-col gap-4">
          <p className="text-xs">Ubicación del evento</p>
          
          {/* Buscador de direcciones */}
          <div className="relative">
            <input 
              type="text" 
              value={searchQuery} 
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setHasSelected(false); // ✅ Resetear cuando el usuario cambia el texto
              }}
              placeholder="Busca una dirección..." 
              className="w-[16rem] md:w-[18rem] border-b rounded-lg bg-input py-2 pr-10 pl-10 font-poppins text-sm text-text-gray"
            />
            <Search 
              strokeWidth={1} 
              size={20} 
              className="absolute left-2 top-1/2 -translate-y-[50%] text-text-gray"
            />
            
            {/* ✅ Botón X para limpiar - Solo aparece si hay texto */}
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 -translate-y-[50%] text-text-gray hover:text-white transition-colors cursor-pointer"
              >
                <X strokeWidth={1} size={20} />
              </button>
            )}
            
            {/* Indicador de carga */}
            {isSearching && (
              <div className="absolute top-full mt-1 w-full bg-secondary rounded-lg border border-border shadow-lg p-3 text-sm text-white z-20">
                Buscando...
              </div>
            )}

            {/* Resultados de búsqueda */}
            {!isSearching && !hasSelected && searchResults.length > 0 && (
              <div className="absolute top-full mt-1 w-full bg-secondary rounded-lg border border-border shadow-lg max-h-60 overflow-y-auto z-20">
                {searchResults.map((result) => (
                  <div 
                    key={result.raw.place_id} 
                    onClick={() => handleSelectResult(result)} 
                    className="p-3 text-sm text-white hover:bg-hover cursor-pointer"
                  >
                    {result.label}
                  </div>
                ))}
              </div>
            )}

            {/* Sin resultados */}
            {!isSearching && !hasSelected && searchQuery.length > 2 && searchResults.length === 0 && (
              <div className="absolute top-full mt-1 w-full bg-secondary rounded-lg border border-border shadow-lg p-3 text-sm text-white z-20">
                No se encontraron resultados
              </div>
            )}
          </div>

          {/* Mapa interactivo */}
          <div className="relative mt-2 h-64 w-[18rem] rounded-lg overflow-hidden border z-0">
            <MapPicker 
              onLocationSelect={setLocation} 
              selectedLocation={location} 
            />
          </div>

          {/* Inputs ocultos para enviar coordenadas */}
          {location && (
            <>
              <input type="hidden" name="latitude" value={location.lat} />
              <input type="hidden" name="longitude" value={location.lng} />
            </>
          )}
        </div>
      </div>

      {/* Botones de acción */}
      <Buttons 
        disabled={
          title === "" || 
          description === "" || 
          !date || 
          !location?.lat || 
          !location?.lng
        } 
      />
    </form>
  );
};

export default CreateEventForm;