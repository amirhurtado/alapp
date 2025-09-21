"use server"

import { prisma } from "@/prisma"

export const getChatsAction = async (currentUserId: string) => {
  const conversations = await prisma.conversation.findMany({
    where: {
      OR: [
        { userAId: currentUserId },
        { userBId: currentUserId },
      ],
    },
    include: {
      lastMsg: true,
      userA: true,
      userB: true,
    },
    orderBy: {
      lastMsg: {
        createdAt: "desc",
      },
    },
  });

  return conversations.map(conv => {
    const otherUser = conv.userAId === currentUserId ? conv.userB : conv.userA;

    return {
      conversationId: conv.id,
      otherUser: {
        username: otherUser.name, 
        displayName: otherUser.displayName,
        imageUrl: otherUser.imageUrl,
      },
      lastMessage: conv.lastMsg ? {
        text: conv.lastMsg.content ?? "",
        createdAt: conv.lastMsg.createdAt,
      } : null
    };
  });
};