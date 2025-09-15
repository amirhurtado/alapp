"use server";

import { prisma } from "@/prisma";

export const deleteAccountAction = async (userId: string) => {
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  return;
};
