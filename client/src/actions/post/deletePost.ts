"use server";
import { prisma } from "@/prisma";

export const deletePostAction = async (postId: number) => {
  await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  return { message: "Post eliminado correctamente" };
};
