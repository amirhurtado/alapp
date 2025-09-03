"use server";

import { prisma } from "@/prisma";

export const getEventsAction = async (groupId: number, page: number = 1) => {
  const skip = (page - 1) * 3;

  return await prisma.event.findMany({
    where: {
      groupId,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip,
    take: 3,
  });
};
