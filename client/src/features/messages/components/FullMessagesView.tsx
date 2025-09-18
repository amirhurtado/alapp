"use client"
import { SimpleChat, UserCardType } from "@/types";
import React from "react";
import InfiniteFollowingsInMessages from "./InfiniteFollowingsInMessages"

interface FullMessagesViewProps {
  chats: SimpleChat[];
  followings: UserCardType[];
  currentUserId: string
}

const FullMessagesView = ({ chats, followings, currentUserId }: FullMessagesViewProps) => {

  console.log("CHATS", chats);
  return (
    <div className="flex flex-col p-4">
      

      <InfiniteFollowingsInMessages followings={followings} currentUserId={currentUserId} />
    </div>
  );
};

export default FullMessagesView;
