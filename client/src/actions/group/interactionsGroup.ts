"use server";

import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";

export const toggleJoinGroupAction = async (
  groupId: number,
  userId: string
) => {
  const isMemberCount = await prisma.group.count({
    where: {
      AND: {
        id: groupId,
        members: {
          some: {
            userId,
          },
        },
      },
    },
  });

  if (isMemberCount > 0) {
    await prisma.memberGroup.delete({
      where: {
        groupId_userId: {
          groupId,
          userId,
        },
      },
    });
  } else {
    await prisma.memberGroup.create({
      data: {
        userId,
        groupId,
      },
    });
  }

  revalidatePath("/groups")
};
