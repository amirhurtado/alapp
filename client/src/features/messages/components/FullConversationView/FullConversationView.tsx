"use client";
import { MessageType } from "@/types";
import WithOutMessages from "./WithOutMessages";
import CreateMessageForm from "./CreateMessageForm";
import InfiniteMessages from "./InfiniteMessages";

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
  messages,
  currentUserId,
  infoOtherUser,
}: FullConversationViewProps) => {


    const queryKey = ["messages", {otherUserId: infoOtherUser.id }]


  return (

    <div className="flex flex-col justify-between h-full  max-h-screen overflow-hidden" >

      <div className="flex flex-col flex-1 justify-end p-4 overflow-hidden  ">

       <InfiniteMessages messages={messages} currentUserId={currentUserId} otherUser={{id: infoOtherUser.id, imageUrl: infoOtherUser.imageUrl, username: infoOtherUser.username}} queryKey={queryKey} />

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
