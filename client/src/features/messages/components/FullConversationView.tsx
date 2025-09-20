import { MessageType } from "@/types";
import { Paperclip, SendHorizontal } from "lucide-react";
import Image from "next/image";
import React from "react";

interface FullConversationViewProps {
  messages: MessageType[];
  currentUserId: string
  infoOtherUser: {
    id: string;
    username: string;
    displayName: string;
    imageUrl: string;
  };
}

const FullConversationView = ({
  messages: initialMessages,
  infoOtherUser,
}: FullConversationViewProps) => {
  console.log(infoOtherUser, initialMessages);
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-1 flex-col justify-end p-4">



        {initialMessages.length === 0 && (
          <div className="flex w-full flex-col items-center gap-6 mb-10">
          <Image alt="imageUser" src={infoOtherUser.imageUrl} width={70} height={70} className="rounded-full"/>
          <p className="text-text-gray text-sm">Inicia una conversación con {infoOtherUser.username} <span className="text-primary-color text-xs">({infoOtherUser.displayName}).</span></p>


          </div>
        )}
      </div>

      <div className="flex bg-hover mb-4">
        <form className="p-4 flex gap-3 items-center justify-between w-full">
          <Paperclip size={22} />
          <div className="flex flex-1 gap-2">
            <input
              className="flex flex-1   outline-none border-none focus:ring-0 font-poppins"
              placeholder="Escribe un mensaje"
            />
            <button>
              <SendHorizontal size={22} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FullConversationView;
