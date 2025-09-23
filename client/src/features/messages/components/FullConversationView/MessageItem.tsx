import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Avatar from "@/components/ui/Avatar";
import { MessageType } from "@/types";
import { Ellipsis, Ban } from "lucide-react"; // Se añade el icono 'Ban'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDeleteMessageMutation } from "../../hooks/useDeleteMessageMutation";

interface MessageItemProps {
  message: MessageType;
  isCurrentUser: boolean;
  otherUser: {
    username: string;
    imageUrl: string;
  };
  queryKey: unknown[];
}

const MessageItem = ({
  message,
  isCurrentUser,
  otherUser,
  queryKey,
}: MessageItemProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  // Se extrae isPending para deshabilitar el botón mientras se borra
  const { mutate, isPending } = useDeleteMessageMutation(queryKey);

  const handleDeleteClick = async () => {
    mutate({ messageId: message.id });
    setPopoverOpen(false);
  };

  return (
    <div
      className={`message-item group flex gap-2 items-end ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
      data-date={new Date(message.createdAt).toISOString()}
    >
      {!isCurrentUser && (
        <Link href={`/${otherUser.username}`}>
          <Avatar src={otherUser.imageUrl} />
        </Link>
      )}

      {/* --- INICIA LA LÓGICA DE VISUALIZACIÓN --- */}
      {message.isDeleted ? (
        // Si el mensaje está borrado, muestra esto:
        <div className="flex items-center gap-2 rounded-lg px-4 py-2 bg-transparent border-1 border-dashed border-border">
          <Ban size={14} className="text-text-gray" />
          <p className="text-sm italic text-text-gray">
            {isCurrentUser
              ? "Has borrado este mensaje"
              : "Ha borrado este mensaje"}
          </p>
        </div>
      ) : (
        // Si no está borrado, muestra el contenido original con las opciones:
        <>
          {isCurrentUser && (
            <div className="flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <button
                    disabled={isPending}
                    className="p-1 rounded-full hover:bg-hover disabled:cursor-not-allowed"
                  >
                    <Ellipsis
                      size={14}
                      className="text-text-gray cursor-pointer"
                    />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-1">
                  <button
                    type="button"
                    onClick={handleDeleteClick}
                    disabled={isPending}
                    className="w-full text-center cursor-pointer bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md text-sm font-medium transition-colors active:scale-[0.98] disabled:bg-red-400"
                  >
                    Borrar
                  </button>
                </PopoverContent>
              </Popover>
            </div>
          )}

          <div
            className={`max-w-xs md:max-w-md flex flex-col rounded-lg px-4 py-2 bg-hover border-1 ${
              isCurrentUser ? "rounded-br-none" : "rounded-bl-none"
            }`}
          >
            <div
              className={`flex flex-col gap-4 ${
                isCurrentUser ? "items-end" : "items-start"
              }`}
            >
              {message.imageUrl && (
                <Image
                  src={message.imageUrl}
                  alt="Imagen adjunta en el mensaje"
                  width={180}
                  height={180}
                  className="rounded-lg mt-1"
                />
              )}
              {/* Se añade una comprobación para no renderizar un <p> vacío si el contenido es null */}
              {message.content && <p className="text-sm">{message.content}</p>}
            </div>

            <p
              suppressHydrationWarning
              className="text-[.6rem] mt-1 text-text-gray text-right"
            >
              {new Date(message.createdAt).toLocaleTimeString("es-CO", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(MessageItem);