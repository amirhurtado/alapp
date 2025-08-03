"use server";
import { prisma } from "@/prisma";

export const getCommentsAction = async (postId: number) => {
  return await prisma.comment.findMany({
    where: {
      postId: postId,
      parentId: null,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          displayName: true,
          imageUrl: true,
        },
      },
     _count : {
      select : {
        comments: true
      }
     },
      likesComment: {
        select : {
          userId: true
        }
      }
    },
    take: 6,
    orderBy : {
      createdAt: 'desc'
    }
  });
};

export const createCommentAction = async (formData: FormData) => {
  const content = formData.get("content") as string;
  const postId = formData.get("postId") as string;

  const userId = formData.get("userId") as string;
  const parentId = formData.get("parentId") as string;

  const intPostId = parseInt(postId, 10);
  const intParentId = parentId ? parseInt(parentId, 10) : null;

  await prisma.comment.create({
    data: {
      content: content,
      postId: intPostId,
      userId: userId,
      parentId: intParentId,
    },
  });

  return;
};

export const toggleLikeCommentAction = async (
  userId: string,
  commentId: number
) => {
  const liked = await prisma.likeComment.findUnique({
    where: {
      userId_commentId: {
        userId,
        commentId,
      },
    },
  });

  if (liked) {
    await prisma.likeComment.delete({
      where: {
        id: liked.id,
      },
    });
  } else {
    await prisma.likeComment.create({
      data: {
        userId,
        commentId,
      },
    });
  }

  return;
};
