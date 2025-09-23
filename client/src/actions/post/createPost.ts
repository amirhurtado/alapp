"use server";

import { prisma } from "@/prisma";
import { uploadFile } from "../constants";
import { postIncludes } from "./constants";
import { createNotificationAction } from "../notification/createNotification";

export const createPostAction = async (formData: FormData) => {
  try {
    const authorId = formData.get("authorId") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File;
    const video = formData.get("video") as File;
    const mentionedUserIds = (formData.get("mentionedUserIds") as string) || "";

    const mentionedIdsArray = mentionedUserIds.split(",").filter((id) => id);

    let mediaUrl: string | undefined = undefined;
    let mediaType: string | undefined = undefined;

    // Decidimos qué archivo subir
    if (image && image.size > 0) {
      mediaUrl = await uploadFile(image, "/posts");
      mediaType = "IMAGE";
    } else if (video && video.size > 0) {
      mediaUrl = await uploadFile(video, "/posts");
      mediaType = "VIDEO";
    }

    const post = await prisma.post.create({
      data: {
        authorId,
        description,
        mediaUrl: mediaUrl,
        mediaType: mediaType,
      },
      include: postIncludes,
    });

    if (mentionedIdsArray.length > 0) {
      await Promise.all(
        mentionedIdsArray.map((userNotificationId) => {
          if (userNotificationId === authorId) return null;

          const data = {
            type: "label",
            receiverId: userNotificationId,
            senderId: authorId,
            link: `/${authorId}/post/${post.id}`,
            message: `Te ha etiquetado en un post`,
          };

          return createNotificationAction(data);
        })
      );
    }

    return {post, mentionedIdsArray };
  } catch (error) {
    console.error("Error en createPostAction:", error);
    throw new Error(
      error instanceof Error ? error.message : "Error creando el post"
    );
  }
};
