"use client";
import { Plus } from "lucide-react";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateEventForm from "./CreateEventForm";

const CreateEventButton = ({ groupId }: { groupId: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div
          className={`bg-icon-green cursor-pointer 
           
           text-black text-center rounded-lg max-w-mas px-2 py-2  xxl:h-auto flex items-center gap-2 md:gap-3  `}
        >
          <Plus size={19} />
          <p className="hidden xxl:block ">Crear evento</p>
          <p className=" xxl:hidden text-sm">Evento</p>
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-max max-h-[80vh] overflow-y-auto ">
        <DialogHeader>
          <DialogTitle>Crea un nuevo evento</DialogTitle>
          <DialogDescription>
            Los miembros de tu grupo podran confirmar asistencia
          </DialogDescription>
        </DialogHeader>
        <CreateEventForm groupId={groupId} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventButton;
