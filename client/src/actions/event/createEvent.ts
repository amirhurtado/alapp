"use server";

import { prisma } from "@/prisma";
import { createNotificationAction } from "../notification/createNotification";

export const createEventAction = async (formData: FormData) => {
  const groupId = parseInt(formData.get("groupId") as string, 10);
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const latitude = parseFloat(formData.get("latitude") as string);
  const longitude = parseFloat(formData.get("longitude") as string);

  const [event, adminId, membersOfGroup] = await Promise.all([
    prisma.event.create({
      data: {
        groupId,
        title,
        description,
        date,
        latitude,
        longitude,
      },
    }),
    prisma.group.findUnique({
      where: {
        id: groupId,
      },
      select: {
        adminId: true,
      },
    }),

    prisma.memberGroup.findMany({
      where: {
        groupId: groupId,
      },
    }),
  ]);

  membersOfGroup.map((member) => {

    if(member.userId === adminId!.adminId) return
    const data = {
      type: "createEvent",
      receiverId: member.userId,
      senderId: adminId!.adminId,
      link: `/group/${groupId}`,
      message: "ha creado un nuevo evento en un grupo al que perteneces",
    };

    return createNotificationAction(data);
  });

  const membersIdOfGroup = membersOfGroup.map((member) => member.userId);

  return { event, membersIdOfGroup };
};
