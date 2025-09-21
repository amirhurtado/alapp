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
    
    if (!conv.lastMsg) {
      return {
        conversationId: conv.id,
        otherUser: {
          id: otherUser.id, // Es bueno incluir el ID
          username: otherUser.name,
          displayName: otherUser.displayName,
          imageUrl: otherUser.imageUrl,
        },
        lastMessage: null
      };
    }

    const sentByMe = conv.lastMsg.senderId === currentUserId;

    return {
      conversationId: conv.id,
      otherUser: {
        id: otherUser.id,
        username: otherUser.name,
        displayName: otherUser.displayName,
        imageUrl: otherUser.imageUrl,
      },
      lastMessage: {
        text: conv.lastMsg.content ?? "",
        createdAt: conv.lastMsg.createdAt,
        sentByMe: sentByMe,  
        senderId: conv.lastMsg.senderId, 
      }
    };
  });
};