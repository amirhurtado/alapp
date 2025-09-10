"use server"

import { prisma } from "@/prisma";
import { uploadFile } from "../constants";
import { postIncludes } from "./constants";

export const createPostAction = async (formData: FormData) => {
  try {
    const authorId = formData.get("authorId") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File;
    const video = formData.get("video") as File; 

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

    return post;
  } catch (error) {
    console.error("Error en createPostAction:", error);
    throw new Error(
      error instanceof Error ? error.message : "Error creando el post"
    );
  }
};