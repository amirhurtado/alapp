"use server";
import { prisma } from "@/prisma";
import { createNotificationAction } from "../notification/createNotification";

export const toggleAssistanceEventAction = async (
  eventId: number,
  userId: string
) => {
  const confirmed = await prisma.eventUserConfirm.findFirst({
    where: {
      eventId,
      userId,
    },
  });

  if (confirmed) {
    await prisma.eventUserConfirm.delete({
      where: {
        id: confirmed.id,
      },
    });
  } else {
    const [event] = await Promise.all([
      prisma.eventUserConfirm.create({
        data: {
          eventId,
          userId,
        },
        select: {
          event: {
            select: {
              group: {
                select: {
                  adminId: true,
                  id: true,
                },
              },
            },
          },
        },
      }),
    ]);

    const data = {
      type: "assist",
      receiverId: event.event.group.adminId,
      senderId: userId,
      link: `/group/${event.event.group.id}`,
      message: `ha confirmado asistencia en uno de los eventos que creaste`,
    };

    createNotificationAction(data);

    return event.event.group.adminId
  }
};
