
"use client"; 

import React, { useMemo } from "react"; 
import dynamic from 'next/dynamic';     
import { Event as EventType } from "@/generated/prisma";

interface EventCardProps {
  event: EventType;
}

const EventCard = ({ event }: EventCardProps) => {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleString("es-CO", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const EventMapDisplay = useMemo(() => dynamic(
    () => import('@/features/events/components/EventMapDisplay'), 
    {
      ssr: false,
      loading: () => (
        <div className="h-40 w-full bg-gray-200 animate-pulse rounded-lg mt-2 flex items-center justify-center">
          <p className="text-xs text-gray-500">Cargando mapa...</p>
        </div>
      )
    }
  ), []);

  const position = event.latitude && event.longitude 
    ? { lat: event.latitude, lng: event.longitude } 
    : null;

  return (
    <div className="border-border border-1 rounded-lg p-2">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">{event.title}</p>
        <p className="text-sm text-text-gray">{event.description}</p>
        <p className="text-xs text-primary-color font-semibold pt-1">{formattedDate}</p>

        {position && (
          <div className="h-40 w-full z-0 rounded-lg overflow-hidden mt-2 border">
            <EventMapDisplay position={position} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;