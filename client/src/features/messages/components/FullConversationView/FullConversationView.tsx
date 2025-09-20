"use client";
import { MessageType } from "@/types";
import WithOutMessages from "./WithOutMessages";
import CreateMessageForm from "./CreateMessageForm";

interface FullConversationViewProps {
  messages: MessageType[];
  currentUserId: string;
  infoOtherUser: {
    id: string;
    username: string;
    displayName: string;
    imageUrl: string;
  };
}

const FullConversationView = ({
  messages: initialMessages,
  currentUserId,
  infoOtherUser,
}: FullConversationViewProps) => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-1 gap-4 flex-col justify-end p-4">
        {initialMessages.map((message) => {
          const isCurrentUser = message.senderId === currentUserId;

          return (
            <div
              key={message.id}
              className={`flex ${
                isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md flex flex-col  rounded-lg px-4 py-1 ${
                  isCurrentUser
                    ? "bg-hover border-1 text-white rounded-br-none items-end"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p
                  className={`text-[.6rem] mt-1 ${
                    isCurrentUser ? "text-blue-100" : "text-gray-500"
                  } text-right`}
                >
                  {new Date(message.createdAt).toLocaleTimeString("es-CO", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}

        {initialMessages.length === 0 && (
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
      />
    </div>
  );
};

export default FullConversationView;
