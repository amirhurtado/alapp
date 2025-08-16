"use server"


import { prisma } from "@/prisma";
import { uploadFile } from "../constants";
import { postIncludes } from "./constants";

export const createPostAction = async (formData: FormData) => {
  try {
    const authorId = formData.get("authorId") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File;

    let urlImage: string | undefined = undefined;

    if (image && image.size > 0) {
      urlImage = await uploadFile(image, "/posts");
    }

    const post = await prisma.post.create({
      data: {
        authorId,
        description,
        imageUrl: urlImage,
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