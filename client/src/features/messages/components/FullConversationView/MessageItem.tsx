// src/components/messages/MessageItem.tsx
import React, { useState } from "react"; // 1. Importar useState
import Link from "next/link";
import Image from "next/image";
import Avatar from "@/components/ui/Avatar";
import { MessageType } from "@/types";
import { Ellipsis } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // 2. Importar componentes de Popover

interface MessageItemProps {
  message: MessageType;
  isCurrentUser: boolean;
  otherUser: {
    username: string;
    imageUrl: string;
  };
}

const MessageItem = ({
  message,
  isCurrentUser,
  otherUser,
}: MessageItemProps) => {
  // 3. Añadir estado para controlar la visibilidad del Popover
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleDeleteClick = () => {
    console.log(`Borrar mensaje con id: ${message.id}`);
    setPopoverOpen(false); // Cierra el popover después de hacer clic
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

      {/* 4. Si es el usuario actual, mostramos el popover de opciones al hacer hover */}
      {isCurrentUser && (
        <div className="flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <button className="p-1 rounded-full hover:bg-hover">
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
                className="w-full text-center cursor-pointer bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md text-sm font-medium transition-colors active:scale-[0.98]"
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
          <p className="text-sm">{message.content}</p>
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
    </div>
  );
};

export default React.memo(MessageItem);