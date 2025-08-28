"use client";
import { Captions, Info } from "lucide-react";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

const CreateEventForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  console.log("date", date?.toISOString())

  return (
    <form className="mt-4 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <p className="text-xs">Nombre del evento</p>

        <div className="relative">
          <input
            id="alias"
            type="text"
            name="title"
            value={`${title}`}
            placeholder="Titulo del evento"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="w-[18rem]  border-b rounded-lg bg-input py-2 pr-3 pl-10 font-poppins text-sm text-text-gray"
          />
          <Captions
            strokeWidth={1}
            size={20}
            className="absolute left-2 top-1/2 -translate-y-[50%] text-text-gray"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-xs">Descripción</p>

        <div className="relative">
          <input
            id="alias"
            type="text"
            name="description"
            value={`${description}`}
            placeholder="Descripción"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="w-[18rem]  border-b rounded-lg bg-input py-2 pr-3 pl-10 font-poppins text-sm text-text-gray"
          />
          <Info
            strokeWidth={1}
            size={20}
            className="absolute left-2 top-1/2 -translate-y-[50%] text-text-gray"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-xs">Fecha</p>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border"
        />
        <input type="hidden" name="date" value={date?.toISOString()}  />
      </div>
    </form>
  );
};

export default CreateEventForm;
