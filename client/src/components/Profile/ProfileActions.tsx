"use client";
import { MessageSquare } from "lucide-react";

const ProfileActions = ({ myProfile }: { myProfile: boolean }) => {
  return (
    <div className="flex justify-end px-3 pt-4">
      {myProfile ? (
        <button aria-label="editar perfil" className="bg-icon-blue px-3 rounded-lg h-8  text-black ">
          <p className="text-sm">Editar perfil</p>
        </button>
      ) : (
        <div className="flex gap-4 items-center">
          <button  aria-label="Enviar mensaje" className="border-1 border-border rounded-full w-10 h-10 flex items-center justify-center">
            <MessageSquare size={20} className="" />
          </button>
          <button aria-label="Seguir" className="bg-white px-3 rounded-lg h-8  text-black ">
            <p className="text-sm">Seguir</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileActions;
