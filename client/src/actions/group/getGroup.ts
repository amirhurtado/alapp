"use server";
import { prisma } from "@/prisma";

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
        NOT: {
          adminId: userId,
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
        adminId: {
          not: userId,
        },

        members: {
          none: {
            userId: userId,
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

export const getGroupInfoAction = async (
  groupId: number,
  currentUserId: string
) => {
  const infoGroup = await prisma.group.findUnique({
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

  if (!infoGroup) return;

  const isMember = infoGroup.members.some((m) => m.user.id === currentUserId);

  const infoGroupWithIsMemberStatus = {
    ...infoGroup,
    isMember,
  };

  return infoGroupWithIsMemberStatus;
};

export const getGroupsByInputAction = async (formData: FormData) => {
  const value = formData.get("nameGroup") as string
  const groups = await prisma.group.findMany({
    where: {
      name: {
        contains: value,
      },
    },
    include: includeGroup,
  });

  return groups ?? []
};
