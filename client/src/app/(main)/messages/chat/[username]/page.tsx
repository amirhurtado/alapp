import { getMessagesWithUserAction } from "@/actions/messages/getMessages";
import { getUserbyNameAction } from "@/actions/user/getUser";
import BackNavigation from "@/components/ui/BackNavigation";
import FullConversationView from "@/features/messages/components/FullConversationView/FullConversationView";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

type Props = {
  params: {
    username: string;
  };
};

const page = async ({ params }: Props) => {
  const { username } = await params;

  const [currUser, infoOtherUser] = await Promise.all([
    currentUser(),
    getUserbyNameAction(username),
  ]);

  if (!currUser || !infoOtherUser) return;

  const [messages] = await Promise.all([
    getMessagesWithUserAction(currUser.id, infoOtherUser.id),
  ]);

  if (!infoOtherUser) return;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <BackNavigation
        title={`Chat con ${username} (${infoOtherUser.displayName})`}
        subtitle="Sé amable"
      />
      <FullConversationView
        messages={messages}
        currentUserId={currUser.id}
        infoOtherUser={{
          id: infoOtherUser.id,
          username: infoOtherUser.name,
          displayName: infoOtherUser.displayName,
          imageUrl: infoOtherUser.imageUrl,
        }}
      />
    </div>
  );
};

export default page;
