"use server";

import { prisma } from "@/prisma";

export const editPostAction = async (formData: FormData) => {
  const postId = parseInt(formData.get("postId") as string);
  const newDescription = formData.get("newDescription") as string | null;


  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!newDescription || !post) return;

  if (post.description !== newDescription) {
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        description: newDescription,
      },
    });
  }
};
