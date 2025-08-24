"use server";

import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";

export const deleteGroupAction = async (groupId: number) => {
   await prisma.group.delete({
    where: {
      id: groupId,
    },
  });

  revalidatePath("/groups")

  return
};
