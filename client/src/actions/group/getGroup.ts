"use server"
import { prisma } from "@/prisma"


export const getGroupsAsAdmin = async (userId: string) => {

    return await prisma.group.findMany({
        where: {
            adminId: userId
        }
    })
}