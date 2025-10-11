"use client";
import { useEffect } from "react"; // 👈 1. Importar useEffect
import { useGlobalMessageUnreadCount } from "@/store/GlobalMessageUnreadCountStore"; // 👈 2. Importar el hook de Zustand
import { MessageType } from "@/types";
import WithOutMessages from "./WithOutMessages";
import CreateMessageForm from "./CreateMessageForm";
import InfiniteMessages from "./InfiniteMessages";

interface FullConversationViewProps {
  messages: MessageType[];
  unreadCount: number; // La cantidad de mensajes que se leyeron al entrar
  currentUserId: string;
  infoOtherUser: {
    id: string;
    username: string;
    displayName: string;
    imageUrl: string;
  };
}

const FullConversationView = ({
  messages,
  unreadCount,
  currentUserId,
  infoOtherUser,
}: FullConversationViewProps) => {
  // 👈 3. Obtener la función para decrementar del estado global
  const { decrement: decrementUnreadMessages } = useGlobalMessageUnreadCount();

  // 👈 4. Usar useEffect para actualizar el estado global
  useEffect(() => {
    // Solo si había mensajes sin leer, llamamos a la función de decremento
    if (unreadCount > 0) {
      decrementUnreadMessages(unreadCount);
    }
  }, []); // El array de dependencias vacío [] asegura que esto se ejecute solo una vez

  const queryKey = ["messages", { otherUserId: infoOtherUser.id }];

  return (
    <div className="flex flex-col justify-between h-full max-h-screen overflow-hidden">
      <div className="flex flex-col flex-1 justify-end p-4 overflow-hidden">
        <InfiniteMessages
          messages={messages}
          currentUserId={currentUserId}
          otherUser={{
            id: infoOtherUser.id,
            imageUrl: infoOtherUser.imageUrl,
            username: infoOtherUser.username,
          }}
          queryKey={queryKey}
        />

        {messages.length === 0 && (
          <WithOutMessages
            otherUser={{
              imageUrl: infoOtherUser.imageUrl,
              username: infoOtherUser.username,
              displayName: infoOtherUser.displayName,
            }}
          />
        )}
      </div>

      <CreateMessageForm
        currentUserid={currentUserId}
        otheruserId={infoOtherUser.id}
        queryKey={queryKey}
      />
    </div>
  );
};

export default FullConversationView;