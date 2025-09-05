"use server"

import { prisma } from "@/prisma";

export const createEventAction = async (formData: FormData) => {
  const groupId = parseInt(formData.get("groupId") as string, 10);
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const latitude = parseFloat(formData.get("latitude") as string);
  const longitude = parseFloat(formData.get("longitude") as string);


  const event = await prisma.event.create({
    data: {
      groupId,
      title,
      description,
      date,
      latitude,
      longitude,
    },
  });


  return event;
};
