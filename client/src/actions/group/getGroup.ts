"use server";
import { prisma } from "@/prisma";
import { postIncludes } from "../post/constants";

export const getGroupsAsAdminAction = async (userId: string) => {
  return await prisma.group.findMany({
    where: {
      adminId: userId,
    },
    include: {
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
