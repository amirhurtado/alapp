import { prisma } from "@/prisma";
import { postIncludes } from "./constants";

export const getPostsAction = async (
  currentUserId: string,
  placement: "mainFeed" | "exploreFeed" | "profile",
  page: number = 1
) => {
  const skip = (page - 1) * 10;

  // Para saber a quién sigo
  const following = await prisma.follow.findMany({
    where: { followerId: currentUserId },
    select: { followingId: true },
  });
  const followingIds = following.map((f) => f.followingId);

  if (placement === "mainFeed") {
    // Posts míos y de los que sigo
    const users = [currentUserId, ...followingIds];
    return prisma.post.findMany({
      where: { authorId: { in: users } },
      skip,
      take: 10,
      include: postIncludes,
      orderBy: { createdAt: "desc" },
    });
  }

  if (placement === "profile") {
    // Solo posts del perfil específico
    return prisma.post.findMany({
      where: { authorId: currentUserId }, // O el perfil que se esté viendo
      skip,
      take: 10,
      include: postIncludes,
      orderBy: { createdAt: "desc" },
    });
  }

  if (placement === "exploreFeed") {
    // Posts de otros que no sean yo ni los que sigo
    const excludedUsers = [currentUserId, ...followingIds];
    return prisma.post.findMany({
      where: {
        NOT: { authorId: { in: excludedUsers } },
      },
      skip,
      take: 10,
      include: postIncludes,
      orderBy: { createdAt: "desc" },
    });
  }
  return [];
};




export const getPostByIdAction = async (postId: number) => {
  return await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: postIncludes,
  });
};



export const getPostsLikedByUserAction = async (
  userId: string,
  page: number = 1
) => {
  const skip = (page - 1) * 10;
  return await prisma.post.findMany({
    where: {
      likesPost: {
        some: {
          userId,
        },
      },
    },
    include: postIncludes,
    take: 10,
    skip,
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getPostsFavoriteByUserAction = async (
  userId: string,
  page: number = 1
) => {
  const skip = (page - 1) * 10;
  return await prisma.post.findMany({
    where: {
      favorites: {
        some: {
          userId,
        },
      },
    },
    skip,
    take: 10,
    include: postIncludes,
    orderBy: {
      createdAt: "desc",
    },
  });
};
