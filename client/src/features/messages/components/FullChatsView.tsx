"use client";
import { SimpleChat, UserCardType } from "@/types";
import React from "react";
import InfiniteFollowingsInMessages from "./InfiniteFollowingsInMessages";

interface FullChatsViewProps {
  chats: SimpleChat[];
  followings: UserCardType[];
  currentUserId: string;
}

const FullChatsView = ({
  chats,
  followings,
  currentUserId,
}: FullChatsViewProps) => {
  console.log("CHATS", chats);

  return (
    <div className="flex flex-col p-4 max-h-screen overflow-y-auto">
      <InfiniteFollowingsInMessages
        followings={followings}
        currentUserId={currentUserId}
      />

      
     

    </div>
  );
};

export default FullChatsView;
