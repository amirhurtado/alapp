"use server";
import { prisma } from "@/prisma";
import { postIncludes } from "../post/constants";

const includeGroup = {
  admin: {
    select: {
      name: true,
    },
  },
  _count: {
    select: {
      members: true,
    },
  },
};

export const getGroupsAsAdminAction = async (userId: string) => {
  return await prisma.group.findMany({
    where: {
      adminId: userId,
    },
    include: includeGroup,
  });
};

export const getGroupsAsMemberAction = async (userId: string) => {
  return await prisma.group.findMany({
    where: {
      AND: {
        members: {
          some: {
            userId: userId,
          },
        },
        adminId: {
          not: userId,
        },
      },
    },
    include: includeGroup,
  });
};

export const getGroupsRecommendationAction = async (
  userId: string,
  page: number = 1
) => {
  const skip = (page - 1) * 3;
  return await prisma.group.findMany({
    where: {
      AND: {
        NOT: {
          adminId: userId,
        },
        members: {
          some: {
            NOT: {
              userId: userId,
            },
          },
        },
      },
    },
    take: 3,
    skip,
    include: includeGroup,
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getGroupInfoAction = async (groupId: number) => {
  return await prisma.group.findUnique({
    where: {
      id: groupId,
    },
    include: {
      admin: {
        select: {
          id: true,
          name: true,
          displayName: true,
          imageUrl: true,
        },
      },
      posts: {
        include: postIncludes,
      },
      members: {
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
      },
    },
  });
};
