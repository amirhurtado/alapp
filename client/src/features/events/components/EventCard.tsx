"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { FullEventType, FullUserType } from "@/types";
import { MapPinCheckInside, Dot } from "lucide-react";
import TimeAgo from "@/components/ui/TimeAgo";
import { DeleteEvent } from "./DeleteEvent";
import { useDeleteEventMutation } from "../hooks/useDeleteEventMutation";
import { EventAction } from "./EventAction";
import { useToggleAssistance } from "../hooks/useToggleAssistance";

import { ConfirmedUsersTooltip } from "./ConfirmedUsersTooltip";

interface EventCardProps {
  event: FullEventType;
  imAdmin: boolean;
  infoCurrentUser: FullUserType;
}

const EventCard = ({ event, imAdmin, infoCurrentUser }: EventCardProps) => {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleString("es-CO", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const onDelete = useDeleteEventMutation(event.groupId);

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

  const onAction = useToggleAssistance(event.groupId);

  // -> 1. (Opcional pero recomendado) Creamos una función manejadora para más claridad
  const handleToggleAssistance = () => {
    // -> 2. Llamamos a la mutación con el objeto de usuario COMPLETO
    onAction.mutate({ eventId: event.id, user: infoCurrentUser });
  };

  return (
    <div className="border-border border-1 rounded-lg px-3 py-4 bg-hover">
      <div className="flex justify-end ">
        {imAdmin ? (
          <DeleteEvent
            onDelete={() => onDelete.mutate({ eventId: event.id })}
          />
        ) : (
          <EventAction
            confirmed={event.usersConfirm.some(
              (confirmation) => confirmation.user.id === infoCurrentUser.id
            )}
            // -> 3. Pasamos la nueva función al onAction
            onAction={handleToggleAssistance}
          />
        )}
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

      <div className="flex justify-end mt-3 items-center gap-3">
        <ConfirmedUsersTooltip confirmations={event.usersConfirm} />

        <TimeAgo createdAt={event.createdAt} />
      </div>
    </div>
  );
};

export default EventCard;