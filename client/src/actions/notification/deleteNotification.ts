"use server"

import { prisma } from "@/prisma"


export const deleteNotificationAction  = async (notificationId : string) => {
    await prisma.notification.delete({
        where: {
            id: notificationId
        }
    })
}