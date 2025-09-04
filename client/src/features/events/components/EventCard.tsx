"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Event as EventType } from "@/generated/prisma";
import { MapPinCheckInside, Dot } from "lucide-react";
import TimeAgo from "@/components/ui/TimeAgo";
import { DeleteEvent } from "./DeleteEvent";
import { useDeleteEventMutation } from "../hooks/useDeleteEventMutation";
import { EventAction } from "./EventAction";

interface EventCardProps {
  event: EventType;
  imAdmin: boolean;
}

const EventCard = ({ event, imAdmin }: EventCardProps) => {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleString("es-CO", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const onDelete =  useDeleteEventMutation(event.groupId)

  const EventMapDisplay = useMemo(
    () =>
      dynamic(() => import("@/features/events/components/EventMapDisplay"), {
        ssr: false,
        loading: () => (
          <div className="h-40 w-full bg-gray-200 animate-pulse rounded-lg mt-2 flex items-center justify-center">
            <p className="text-xs text-gray-500">Cargando mapa...</p>
          </div>
        ),
      }),
    []
  );

  const position =
    event.latitude && event.longitude
      ? { lat: event.latitude, lng: event.longitude }
      : null;

  return (
    <div className="border-border border-1 rounded-lg px-3 py-4 bg-hover">
      <div className="flex justify-end ">
      
        {imAdmin ? <DeleteEvent onDelete={() => onDelete.mutate({eventId: event.id})}/> : <EventAction />} 
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Dot size={18} />
          <p className="text-sm font-medium">{event.title}</p>
        </div>

        <p className="text-sm text-text-gray">{event.description}</p>
        <p className="text-xs text-primary-color font-semibold pt-3">
          <span className="text-xs text-text-gray">Para: </span>
          {formattedDate}
        </p>

        <div className="flex flex-col gap-1 mt-2">
          <div className="flex gap-1 ">
            <MapPinCheckInside size={18} />
            <p className="text-xs text-text-gray">Lugar de encuentro:</p>
          </div>
          {position && (
            <div className="h-40 w-full z-0 rounded-lg overflow-hidden mt-2 border">
              <EventMapDisplay position={position} />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end mt-3">
        <TimeAgo createdAt={event.createdAt} />
      </div>
    </div>
  );
};

export default EventCard;
