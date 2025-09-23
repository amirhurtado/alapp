"use server"

import { prisma } from "@/prisma"

export const deleteMessageAction = async (messageId: number) => {
  try {
    const updatedMessage = await prisma.messages.update({
      where: {
        id: messageId,
      },
      data: {
        content: "Mensaje borrado", 
        imageUrl: null,              
        isDeleted: true,                  
      },
      select: {
      id: true,
      content: true,
      isDeleted: true,
      imageUrl: true,
      createdAt: true,
      senderId: true,
      receiverId: true
    },
    });


    return {newMessage: updatedMessage };
  } catch (error) {
    console.error("Error al borrar el mensaje:", error);
    return { success: false, error: "No se pudo borrar el mensaje." };
  }
};