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