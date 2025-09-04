"use server";
import { prisma } from "@/prisma";

export const deleteEventAction = async (eventId: number) => {
  await prisma.event.delete({
    where: {
      id: eventId,
    },
  });
};
