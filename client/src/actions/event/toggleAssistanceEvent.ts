"use server";
import { prisma } from "@/prisma";



export const toggleAssistanceEventAction = async (eventId: number, userId: string) => {
    const confirmed = await prisma.eventUserConfirm.findFirst({
        where: {
            eventId,
            userId
        }
    });

    if (confirmed) {
        await prisma.eventUserConfirm.delete({
            where: {
                id: confirmed.id
            }
        });
       
    }else{
        await prisma.eventUserConfirm.create({
        data: {
            eventId,
            userId
        }
    });

    }

    

}


