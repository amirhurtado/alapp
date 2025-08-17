"use server";

import { prisma } from "@/prisma";
import { postIncludes } from "./constants";

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

export const getUserLikesInPostAction = async (
  currentUserId: string,
  postId: number,
  page: number = 1
) => {
  const skip = (page - 1) * 10;
  const [postUsersWithLike, myFollowings] = await Promise.all ([

    prisma.post.findMany({
    where: {
      id: postId,
    },
    select: {
      likesPost: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              displayName: true,
              imageUrl: true,
            },
          },
        },
        take: 10,
        skip,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  }),

  prisma.follow.findMany({
    where: {
      followerId: currentUserId
    }
  })
  ]) 

  const myfollowingsIds = myFollowings.map((follow) => follow.followingId);

  const users = postUsersWithLike.flatMap((post) => post.likesPost.map((like) => like.user));

  const usersWithFriendStatus = users.map(user => {
    return {
      ...user,
      isFriend: myfollowingsIds.includes(user.id)
    }
  })

  return usersWithFriendStatus

  
};
