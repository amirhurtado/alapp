"use server";
import { prisma } from "@/prisma";
import { createNotificationAction } from "../notification/createNotification";

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

export const getCommentsByParentIdAction = async (
  parentId: number,
  request: number
) => {
  const skip = (request - 1) * 3;

  return await prisma.comment.findMany({
    where: {
      parentId,
    },
    include: includeFullComment,
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
    skip,
  });
};

export const createCommentAction = async (formData: FormData) => {
  const content = formData.get("content") as string;
  const postId = formData.get("postId") as string;

  const userId = formData.get("userId") as string;
  const parentId = formData.get("parentId") as string;

  const intPostId = parseInt(postId, 10);
  const intParentId = parentId ? parseInt(parentId, 10) : null;

  const [comment, post] = await Promise.all([
    prisma.comment.create({
      data: {
        content: content,
        postId: intPostId,
        userId: userId,
        parentId: intParentId,
      },
      include: includeFullComment,
    }),
    prisma.post.findUnique({
      where: {
        id: intPostId,
      },
    }),
  ]);

  if (post && userId !== post?.authorId) {
    const data = {
      type: "commment",
      receiverId: post.authorId,
      senderId: userId,
      link: `${post.authorId}/post/${postId}`,
      message: parentId
        ? "respondió un comentario en tu publicación."
        : "comentó tu publicacion.",
    };

    createNotificationAction(data);
  }

  return {
    data: comment,
    receiverNotificationId: userId !== post?.authorId ? post?.authorId : null,
  };
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
    const [, comment] = await Promise.all([
      prisma.likeComment.create({
        data: {
          userId,
          commentId,
        },
      }),
      prisma.comment.findUnique({
        where: {
          id: commentId,
        },
        include: {
          post: {
            select: {
              id: true,
              authorId: true,
            },
          },
        },
      }),
    ]);

    if (comment && userId !== comment?.userId) {
      const data = {
        type: "like",
        receiverId: comment.userId,
        senderId: userId,
        link: `${comment.post.authorId}/post/${comment.post.id}`,
        message: "Le dio like a tu comentario.",
      };

      createNotificationAction(data);


      return comment.userId
    }
  }

  return;
};
