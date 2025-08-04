"use server";

import { prisma } from "@/prisma";
import { currentUser } from "@clerk/nextjs/server";

type ClerkUser = NonNullable<Awaited<ReturnType<typeof currentUser>>>;

export const userExistsAction = async (user: ClerkUser) => {
  const response = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (response) {
    return response;
  } else {
    const dbUser = await prisma.user.create({
      data: {
        id: user.id,
        name: user.username || "",
        displayName: user.username || "",
        email: user.emailAddresses[0].emailAddress,
        imageUrl: "/user-default",
      },
    });

    return dbUser;
  }
};

export const getUserbyNameAction = async (username: string) => {
  return await prisma.user.findUnique({
    where: {
      name: username,
    },
    include: {
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true,
        },
      },
    },
  });
};

export const getImgUrlAction = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      imageUrl: true,
    },
  });
};

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


export const updateInfoUserAction =  async (formData: FormData) => {
   const newDisplayName = formData.get('newDisplayName') as string
   console.log("NUEVO NOMBRE", newDisplayName)
}

export const toggleFollowAction = async (
  isFriend: boolean,
  userFollowerId: string,
  userFollowingId: string
) => {
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
    await prisma.follow.create({
      data: {
        followerId: userFollowerId,
        followingId: userFollowingId,
      },
    });
  }
};

export const getRecomentationsAction = async (userId: string) => {
  const following = await prisma.follow.findMany({
    where: {
      followerId: userId,
    },
  });

  const followingIds = following.map((follow) => follow.followingId);
  const noFind = [...followingIds, userId];

  return await prisma.user.findMany({
    where: {
      NOT: {
        id: {
          in: noFind,
        },
      },
    },
    take: 5,
    select: {
      id: true,
      name: true,
      displayName: true,
      imageUrl: true,
    },
  });
};
