"use server";

import { prisma } from "@/prisma";
import { uploadFile } from "./constants";



const postIncludes = {
  author: {
    select: {
      id: true,
      name: true,
      displayName: true,
      imageUrl: true,
    },
  },
  likesPost: {
    select: { userId: true },
  },
  favorites: {
    select: { userId: true },
  },
  reposts: {
    select: { userId: true },
  },
  _count: {
    select: {
      comments: true,
    },
  },
};

export const createPostAction = async (formData: FormData) => {
  try {
    const authorId = formData.get("authorId") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File;

    let urlImage: string | undefined = undefined;

    if (image && image.size > 0) {
      urlImage = await  uploadFile(image, "/posts" )
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


export const getPostByIdAction = async (postId: number) => {
  return await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: postIncludes,
  });
};

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
  const followingIds = following.map(f => f.followingId);

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
  return []

};



export const toggleLikePostAction = async (postId: number, userId: string) => {
  const existLike = await prisma.likePost.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  if (existLike) {
    await prisma.likePost.delete({
      where: {
        id: existLike.id,
      },
    });
  } else {
    await prisma.likePost.create({
      data: {
        postId,
        userId,
      },
    });
  }

  return await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: postIncludes,
  });
};

export const toggleFavoriteAction = async (postId: number, userId: string) => {
  const existFavorite = await prisma.favorite.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  if (existFavorite) {
    await prisma.favorite.delete({
      where: {
        id: existFavorite.id,
      },
    });
  } else {
    await prisma.favorite.create({
      data: {
        postId,
        userId,
      },
    });
  }
  return;
};

export const toggleRepostAction = async (postId: number, userId: string) => {
  const existRepost = await prisma.repost.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  if (existRepost) {
    await prisma.repost.delete({
      where: {
        id: existRepost.id,
      },
    });
  } else {
    await prisma.repost.create({
      data: {
        userId,
        postId,
      },
    });
  }
};


export const getPostsLikedByUser = async (userId: string, page: number = 1) => {
  const skip = (page - 1) * 10
  return await prisma.post.findMany({
    where: {
      likesPost: {
        some : {
          userId
        }
      }
    },
    include: postIncludes,
    take: 10,
    skip,
    orderBy: {
      createdAt: "desc"
    }
  })
}