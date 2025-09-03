"use client";
import { Captions, Info, MapPin } from "lucide-react";
import React, { useState, useMemo } from "react";
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

const CreateEventForm = ({ groupId, onSuccess }: CreateEventFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [location, setLocation] = useState<Location | null>(null);


  const onCreate = useCreateEventMutation(groupId);

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
      className="mt-4 flex flex-col gap-6 "
      action={async (formData) => {
        onCreate.mutate({formData})
        onSuccess();
      }}
    >
      <input type="hidden" name="groupId" value={groupId} />
      <div className="flex items-start flex-col gap-1 ">
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
      <div className="flex items-start flex-col gap-1">
        <p className="text-xs">Descripción</p>
        <div className="relative">
          <input
            id="alias"
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

      <div className="flex flex-col md:flex-row gap-4 md:gap-10">
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

        <div className="flex items-start flex-col gap-4">
          <p className="text-xs">Ubicación del evento</p>
          <div className="relative">
            <input
              readOnly
              value={
                location
                  ? `Lat: ${location.lat.toFixed(
                      4
                    )}, Lng: ${location.lng.toFixed(4)}`
                  : "Selecciona un punto en el mapa"
              }
              className="w-[16rem] med:w-[18rem] border-b rounded-lg bg-input py-2 pr-3 pl-10 font-poppins text-sm text-text-gray"
            />
            <MapPin
              strokeWidth={1}
              size={20}
              className="absolute left-2 top-1/2 -translate-y-[50%] text-text-gray"
            />
          </div>

          <div className="mt-2 h-64 w-[18rem] rounded-lg overflow-hidden border">
            <MapPicker onLocationSelect={setLocation} />
          </div>

          {location && (
            <>
              <input type="hidden" name="latitude" value={location.lat} />
              <input type="hidden" name="longitude" value={location.lng} />
            </>
          )}
        </div>
      </div>

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
