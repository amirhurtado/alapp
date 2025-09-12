"use server";

import { prisma } from "@/prisma";
import { postIncludes } from "./constants";
import { handlePostNotification } from "../notification/createNotification";

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
    const [, post] = await Promise.all([
      prisma.likePost.create({
        data: {
          postId,
          userId,
        },
      }),
      prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: postIncludes,
      }),
    ]);

    //NOTIFICATION
    return handlePostNotification(
      post,
      userId,
      postId,
      "like",
      "le dió me gusta a tu publicación"
    );
  }

  return;
};

export const toggleFavoriteAction = async (postId: number, userId: string) => {
  const [existFavorite] = await Promise.all([
    prisma.favorite.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    }),
  ]);

  if (existFavorite) {
    await prisma.favorite.delete({
      where: {
        id: existFavorite.id,
      },
    });
  } else {
    const [, post] = await Promise.all([
      prisma.favorite.create({
        data: {
          postId,
          userId,
        },
      }),
      prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: postIncludes,
      }),
    ]);

    //NOTIFICATION
    return handlePostNotification(
      post,
      userId,
      postId,
      "favorite",
      "agregó a favoritos tu publicación"
    );
  }

  return;
};

export const toggleRepostAction = async (postId: number, userId: string) => {
  const [existRepost] = await Promise.all([
    prisma.repost.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    }),
  ]);

  if (existRepost) {
    await prisma.repost.delete({
      where: {
        id: existRepost.id,
      },
    });
  } else {
    const [, post] = await Promise.all([
      await prisma.repost.create({
        data: {
          userId,
          postId,
        },
      }),

      prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: postIncludes,
      }),
    ]);

    return handlePostNotification(
      post,
      userId,
      postId,
      "repost",
      "compartió tu publicación"
    );
  }
};

export const getUserLikesInPostAction = async (
  currentUserId: string,
  postId: number,
  page: number = 1
) => {
  const skip = (page - 1) * 10;
  const [postUsersWithLike, myFollowings] = await Promise.all([
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
        followerId: currentUserId,
      },
    }),
  ]);

  const myfollowingsIds = myFollowings.map((follow) => follow.followingId);

  const users = postUsersWithLike.flatMap((post) =>
    post.likesPost.map((like) => like.user)
  );

  const usersWithFriendStatus = users.map((user) => {
    return {
      ...user,
      isFriend: myfollowingsIds.includes(user.id),
    };
  });

  return usersWithFriendStatus;
};

export const getUserRepostsInPostAction = async (
  currentUserId: string,
  postId: number,
  page: number = 1
) => {
  const skip = (page - 1) * 10;
  const [repostUsersWithRepost, myFollowings] = await Promise.all([
    prisma.post.findMany({
      where: {
        id: postId,
      },
      select: {
        reposts: {
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
        followerId: currentUserId,
      },
    }),
  ]);

  const myfollowingsIds = myFollowings.map((follow) => follow.followingId);

  const users = repostUsersWithRepost.flatMap((post) =>
    post.reposts.map((repost) => repost.user)
  );

  const usersWithFriendStatus = users.map((user) => {
    return {
      ...user,
      isFriend: myfollowingsIds.includes(user.id),
    };
  });

  return usersWithFriendStatus;
};
