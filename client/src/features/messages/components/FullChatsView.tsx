"use client";
import { SimpleChat, UserCardType } from "@/types";
import React from "react";
import InfiniteFollowingsInMessages from "./InfiniteFollowingsInMessages";
import Image from "next/image";

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

  return (
    <div className="flex flex-col gap-10 p-4 max-h-screen overflow-y-auto">
      <InfiniteFollowingsInMessages
        followings={followings}
        currentUserId={currentUserId}
      />

      <div className="flex flex-col gap-6">

        <p className="font-bold font-poppins">Tus chats</p>


      {chats.length > 0 ? <p>SI</p> : (
        <div className="flex flex-col w-full gap-3 items-center mt-10">
          <Image src={`/ghost.webp`} alt="ghost" width={100} height={100} />
          <p className="text-text-gray text-sm">No tienes chats</p>

        </div>
      )}


      </div>
      
      
     

    </div>
  );
};

export default FullChatsView;
