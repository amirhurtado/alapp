"use server";
import { prisma } from "@/prisma";

const includeFullComment = {
  user: {
    select: {
      id: true,
      name: true,
      displayName: true,
      imageUrl: true,
    },
  },
  _count: {
    select: {
      comments: true,
    },
  },
  likesComment: {
    select: {
      userId: true,
    },
  },
};

export const getCommentsAction = async (postId: number, page: number = 1) => {
  const skip = (page - 1) * 6;
  return await prisma.comment.findMany({
    where: {
      postId: postId,
      parentId: null,
    },
    include: includeFullComment,
    skip,
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getCommentsByParentIdAction = async(parentId: number, request: number) => {
  const skip = (request-1) * 3

  return await prisma.comment.findMany({
    where: {
      parentId
    },
    include: includeFullComment,
    take: 3,
     orderBy: {
      createdAt: "desc",
    },
    skip
  })

}


export const createCommentAction = async (formData: FormData) => {
  const content = formData.get("content") as string;
  const postId = formData.get("postId") as string;

  const userId = formData.get("userId") as string;
  const parentId = formData.get("parentId") as string;

  const intPostId = parseInt(postId, 10);
  const intParentId = parentId ? parseInt(parentId, 10) : null;

  const comment = prisma.comment.create({
    data: {
      content: content,
      postId: intPostId,
      userId: userId,
      parentId: intParentId,
    },
    include: includeFullComment
  });

  return comment;
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
