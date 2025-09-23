// src/components/messages/MessageItem.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Avatar from "@/components/ui/Avatar";
import { MessageType } from "@/types"; // Asegúrate de importar tu tipo de mensaje

// Definimos las props que necesita nuestro nuevo componente
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
  return (
    <div
      className={`message-item flex gap-2 items-end ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
      // El dataset se usa para la lógica del label flotante en el componente padre
      data-date={new Date(message.createdAt).toISOString()}
    >
      {/* Muestra el avatar solo si el mensaje no es del usuario actual */}
      {!isCurrentUser && (
        <Link href={`/${otherUser.username}`}>
          <Avatar src={otherUser.imageUrl} />
        </Link>
      )}

      <div
        className={`max-w-xs md:max-w-md flex flex-col rounded-lg px-4 py-2 bg-hover border-1 ${
          isCurrentUser ? "rounded-br-none items-end" : "rounded-bl-none"
        }`}
      >
        <div
          className={`flex flex-col gap-4 ${
            isCurrentUser ? "items-end" : "items-start"
          }`}
        >
          {/* Renderiza la imagen si existe */}
          {message.imageUrl && (
            <Image
              src={message.imageUrl}
              alt="Imagen adjunta en el mensaje"
              width={180}
              height={180}
              className="rounded-lg mt-1"
            />
          )}
          {/* Renderiza el contenido del texto */}
          <p className="text-sm">{message.content}</p>
        </div>
        {/* Muestra la hora del mensaje */}
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

// Usamos React.memo para optimizar, evitando re-renders si las props no cambian.
export default React.memo(MessageItem);