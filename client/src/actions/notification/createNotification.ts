"use server";

import { prisma } from "@/prisma";
import { socket } from "@/socket";
import { Notification as NotificationType } from "@/generated/prisma";

type CreateNotificationInput = Omit<NotificationType, "id" | "createdAt">;


export const createNotificationAction = async (data: CreateNotificationInput) => {
  const notification = await prisma.notification.create({
    data: data,
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

  socket.emit("sendNotification", {
    receiverUserId: data.receiverId,
  });

    return notification;
};
