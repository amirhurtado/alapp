"use server"

import { prisma } from "@/prisma"

export const deleteCommentServer = async (commentId: number) => {
    return await prisma.comment.delete({
        where: {
            id: commentId
        }
    })
}