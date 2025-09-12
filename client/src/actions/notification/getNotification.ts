"use server"
import { prisma } from "@/prisma";

export const getNoticationsAction = async (userId: string, page: number = 1) => {
    const skip = (page - 1) * 10;
  const notifications = await prisma.notification.findMany({
    where: {
      receiverId: userId,
    },
    skip,
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          displayName: true,
          imageUrl: true,
        },
      },
    },
  });

  return notifications;
};
