import { getMessagesWithUserAction } from "@/actions/messages/getMessages";
import { markConversationAsReadAction } from "@/actions/messages/resetUnreadsMessage";
import { getUserbyNameAction } from "@/actions/user/getUser";
import BackNavigation from "@/components/ui/BackNavigation";
import FullConversationView from "@/features/messages/components/FullConversationView/FullConversationView";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { username } = await params;

  const [currUser, infoOtherUser] = await Promise.all([
    currentUser(),
    getUserbyNameAction(username),
  ]);

  if (!currUser || !infoOtherUser) return;

  const [messages, unreadCount] = await Promise.all([
    getMessagesWithUserAction(currUser.id, infoOtherUser.id),
    markConversationAsReadAction(currUser.id, infoOtherUser.id)
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
        unreadCount={unreadCount}
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
