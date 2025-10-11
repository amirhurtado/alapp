"use server";

import { prisma } from "@/prisma";

export const getMessagesWithUserAction = async (
  currentUserId: string,
  otherUserId: string,
  page: number = 1
) => {

    const skip = (page-1) * 15
 
  const messages = await prisma.messages.findMany({
    where: {
      OR: [
        { senderId: currentUserId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: currentUserId },
      ],
    },
    select: {
      id: true,
      content: true,
      isDeleted: true,
      imageUrl: true,
      createdAt: true,
      senderId: true,
      receiverId: true
    },
    orderBy: {
      createdAt: "desc", 
    },
    take: 15,
    skip
  });

  return messages;
};


export const getTotalUnreadCountAction = async (userId: string) => {

  
    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [{ userAId: userId }, { userBId: userId }],
      },
      select: {
        userAId: true,
        userAUnreadCount: true,
        userBUnreadCount: true,
      },
    });


    const totalUnreadCount = conversations.reduce((total, convo) => {
      if (convo.userAId === userId) {
        return total + convo.userAUnreadCount;
      } else {
        return total + convo.userBUnreadCount;
      }
    }, 0); 

    return totalUnreadCount;
  }
  
  