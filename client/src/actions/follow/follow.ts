"use server";
import { prisma } from "@/prisma";
import { createNotificationAction } from "../notification/createNotification";

export const isFriendAction = async (
  userFollowerId: string,
  userFollowingId: string
) => {
  const isFriend = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: userFollowerId,
        followingId: userFollowingId,
      },
    },
  });

  if (isFriend) {
    return true;
  } else return false;
};

export const toggleFollowAction = async (
  userFollowerId: string,
  userFollowingId: string
) => {
  const isFriend = await isFriendAction(userFollowerId, userFollowingId);
  if (isFriend) {
    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId: userFollowerId,
          followingId: userFollowingId,
        },
      },
    });
  } else {
    const [, receiverUsername] = await Promise.all([
      prisma.follow.create({
      data: {
        followerId: userFollowerId,
        followingId: userFollowingId,
      },
    }),
    prisma.user.findUnique({
      where: {
        id: userFollowingId
      },
      select: {
        name: true
      }
    })

    ]) 

    const data = {
      type: "follow",
      receiverId: userFollowingId,
      senderId: userFollowerId,
      link: `/${receiverUsername?.name}/follows?query=followers`, 
      message: "te ha seguido",
    }

    createNotificationAction(data)


    return userFollowingId;
  }
};

export const getFollowsCountActions = async (
  userId: string,
  currentUserId: string
) => {
  const [following, followers] = await Promise.all([
    prisma.follow.count({
      where: {
        followerId: userId,
      },
    }),
    prisma.follow.count({
      where: {
        followingId: userId,
      },
    }),
  ]);

  const isFriend = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: currentUserId,
        followingId: userId,
      },
    },
  });

  let findIsfriend = false;
  if (isFriend) {
    findIsfriend = true;
  } else {
    findIsfriend = false;
  }

  return { following, followers, findIsfriend };
};

export const getFollowingsAction = async (
  userProfileId: string,
  page: number = 1
) => {
  const skip = (page - 1) * 10;

  const followings = await prisma.follow.findMany({
    where: {
      followerId: userProfileId,
    },
    select: {
      following: {
        select: {
          id: true,
          name: true,
          displayName: true,
          imageUrl: true,
        },
      },
    },
    skip,
    orderBy: {
      createdAt: "desc",
    },
  });

  return followings.map((followings) => followings.following)
};


export const getFollowersAction = async (
  userProfileId: string,
  page: number = 1
) => {
  const skip = (page - 1) * 10;

  const followers = await prisma.follow.findMany({
    where: {
      followingId: userProfileId,
    },
    select: {
      follower: {
        select: {
          id: true,
          name: true,
          displayName: true,
          imageUrl: true,
        },
      },
    },
    skip,
    orderBy: {
      createdAt: "desc",
    },
  });

  return followers.map((followings) => followings.follower)
};
