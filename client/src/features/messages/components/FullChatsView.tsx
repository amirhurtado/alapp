"use client";
import { SimpleChat, UserCardType } from "@/types";
import React from "react";
import InfiniteFollowingsInMessages from "./InfiniteFollowingsInMessages";
import Image from "next/image";
import Avatar from "@/components/ui/Avatar";
import TimeAgo from "@/components/ui/TimeAgo";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

interface FullChatsViewProps {
  chats: SimpleChat[];
  followings: UserCardType[];
  currentUserId: string;
}

const FullChatsView = ({
  chats: initialData,
  followings,
  currentUserId,
}: FullChatsViewProps) => {
  const queryKey = ["chatsWithConversation"];

  const { data: chats } = useQuery({
    queryKey,
    queryFn: () => initialData,
    initialData: initialData,
  });

  return (
    <div className="flex flex-col gap-10 p-4 max-h-screen overflow-y-auto">
      <InfiniteFollowingsInMessages
        followings={followings}
        currentUserId={currentUserId}
      />

      <div className="flex flex-col gap-6">
        <p className="font-bold font-poppins">Tus chats</p>

        <div className="flex flex-col">
          {chats.length > 0 ? (
            chats.map((chat, index) => (
              <Link
                href={`/messages/chat/${chat.otherUser.username}`}
                key={index}
                className="w-full border-y-1 border-boder flex justify-between p-4 bg-hover "
              >
                <div className="flex gap-2">
                  <Avatar src={chat.otherUser.imageUrl} />
                  <div className="flex flex-col justify-center">
                    <p className="text-sm">{chat.otherUser.username}</p>
                    <p className="text-xs text-text-gray">
                      {chat.otherUser.displayName}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="flex flex-col justify-center items-end">
                    {chat.lastMessage && (
                      <>
                        <p
                          className={`text-text-gray text-xs ${
                            chat.lastMessage.isDeleted ? "italic" : ""
                          }`}
                        >
                          {/* CORRECCIÓN: El <span> con el prefijo ahora está fuera del condicional */}
                          <span className="text-primary-color">{chat.lastMessage.sentByMe ? "Tú: " : `${chat.otherUser.username}: `}</span>
                          
                          {chat.lastMessage.text.length > 23
                            ? chat.lastMessage.text.slice(0, 23) + "..."
                            : chat.lastMessage.text}
                        </p>

                        <TimeAgo
                          createdAt={chat.lastMessage.createdAt}
                          withOutDot={true}
                          textxs={true}
                        />
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex flex-col w-full gap-3 items-center mt-10">
              <Image src={`/ghost.webp`} alt="ghost" width={100} height={100} />
              <p className="text-text-gray text-sm">No tienes chats</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullChatsView;