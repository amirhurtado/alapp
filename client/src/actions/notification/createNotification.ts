"use server";

import { prisma } from "@/prisma";
import { Notification as NotificationType } from "@/generated/prisma";

type CreateNotificationInput = Omit<NotificationType, "id" | "createdAt">;

export const createNotificationAction = async (
  data: CreateNotificationInput
) => {
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
  return notification;
};





export async function handlePostNotification(
  post: { authorId: string } | null, 
  userId: string,
  postId: number,
  notificationType: "like" | "favorite" | "repost",
  notificationMessage: string
) {
  if (post && post.authorId !== userId) {
    
    const data = {
      type: notificationType,
      receiverId: post.authorId,
      senderId: userId,
      link: `${post.authorId}/post/${postId}`, 
      message: notificationMessage,
    };

    await createNotificationAction(data);

    return post.authorId;
  }

  return;
}