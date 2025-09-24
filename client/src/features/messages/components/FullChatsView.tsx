"use client";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getChatsAction } from "@/actions/messages/getChats";
import { socket } from "@/socket";

import { SimpleChat, UserCardType } from "@/types";
import React from "react";
import InfiniteFollowingsInMessages from "./InfiniteFollowingsInMessages";
import Image from "next/image";
import Avatar from "@/components/ui/Avatar";
import TimeAgo from "@/components/ui/TimeAgo";
import Link from "next/link";

const chatsQueryKey = ["chatsWithConversation"];

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
  const queryClient = useQueryClient();

  const { data: chats } = useQuery({
    queryKey: chatsQueryKey,
    queryFn: () => getChatsAction(currentUserId),
    initialData: initialData,
  });

  useEffect(() => {
    const onNewMessage = () => {
      queryClient.invalidateQueries({ queryKey: chatsQueryKey });
    };

    socket.on("newMessage", onNewMessage);

    return () => {
      socket.off("newMessage", onNewMessage);
    };
  }, [queryClient]);

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
            chats.map((chat) => (
              <Link
                href={`/messages/chat/${chat.otherUser.username}`}
                key={chat.conversationId} // Es mejor usar un ID único como key
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

                <div className="flex gap-3 items-center">
                  {/* Solo mostrar el contador si es mayor que cero */}
                  {chat.unreadCount > 0 && (
                    <p className="flex items-center justify-center w-6 h-6 text-sm bg-icon-green text-white rounded-full">
                      {chat.unreadCount}
                    </p>
                  )}

                  <div className="flex flex-col justify-center items-end">
                    {chat.lastMessage && (
                      <>
                        <p
                          className={`text-text-gray text-xs ${
                            chat.lastMessage.isDeleted ? "italic" : ""
                          }`}
                        >
                          <span className="text-primary-color">
                            {chat.lastMessage.sentByMe ? "Tú: " : ""}
                          </span>
                          {chat.lastMessage.text ? (
                            chat.lastMessage.text.length > 23 ? (
                              chat.lastMessage.text.slice(0, 23) + "..."
                            ) : (
                              chat.lastMessage.text
                            )
                          ) : (
                            <i>imagen</i>
                          )}
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
