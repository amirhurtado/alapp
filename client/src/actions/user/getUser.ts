"use server";
import { prisma } from "@/prisma";

export const getUserbyNameAction = async (username: string) => {
  return await prisma.user.findUnique({
    where: {
      name: username,
    },
    include: {
      profile: true,
      _count: {
        select: {
          posts: true,
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

export const getRecomentationsAction = async (
  userId: string,
  alreadyFetchedIds: string[]
) => {
  const following = await prisma.follow.findMany({
    where: {
      followerId: userId,
    },
  });

  const followingIds = following.map((follow) => follow.followingId);
  const exclusion = Array.from(
    new Set([...followingIds, userId, ...(alreadyFetchedIds ?? [])])
  );

  const recommendations = await prisma.user.findMany({
    where: {
      NOT: {
        id: {
          in: exclusion,
        },
      },
    },
    take: 3,
    select: {
      id: true,
      name: true,
      displayName: true,
      imageUrl: true,
    },
  });

  const usersWithFriendStatus = recommendations.map((user) => ({
    ...user,
    isFriend: followingIds.includes(user.id),
  }));

  return usersWithFriendStatus;
};

export const getUsersInSearchAction = async (
  query: string | undefined,
  currentUserId: string,
  page: number = 1
) => {
  if (!query) return [];

  const skip = (page - 1) * 10;
  const [users, myFollowings] = await Promise.all([
    prisma.user.findMany({
      where: {
        AND: {
          name: {
            contains: query,
          },
          NOT: {
            id: currentUserId,
          },
        },
      },
      take: 10,
      skip,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.follow.findMany({
      where: {
        followerId: currentUserId,
      },
    }),
  ]);

  const myFollowingsId = myFollowings.map((following) => following.followingId);

  const usersWithFriendStatus = users.map((user) => {
    return {
      ...user,
      isFriend: myFollowingsId.includes(user.id),
    };
  });

  return usersWithFriendStatus;
};
