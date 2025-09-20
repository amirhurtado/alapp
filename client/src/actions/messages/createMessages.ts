"use server";

import { prisma } from "@/prisma";


export const createMessageAction = async (formData: FormData) => {
  // 1. Extraer y validar los datos del FormData
  const content = formData.get("content") as string | null;
  const imageUrl = formData.get("imageUrl") as string | null; 
  const senderId = formData.get("senderId") as string;
  const receiverId = formData.get("receiverId") as string; 

  

  try {
    // 2. Buscar si ya existe una conversación entre los dos usuarios
    let conversation = await prisma.conversation.findFirst({
      where: {
        OR: [
          { userAId: senderId, userBId: receiverId },
          { userAId: receiverId, userBId: senderId },
        ],
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          userAId: senderId,
          userBId: receiverId,
        },
      });
    }

    const conversationId = conversation.id;

    const newMessage = await prisma.$transaction(async (tx) => {
      const createdMessage = await tx.messages.create({
        data: {
          content: content,
          imageUrl: imageUrl,
          senderId: senderId,
          receiverId: receiverId,
          conversationId: conversationId,
        },
      });

      await tx.conversation.update({
        where: {
          id: conversationId,
        },
        data: {
          lastMsgId: createdMessage.id,
        },
      });

      return createdMessage;
    });
    
   

    return { success: true, message: newMessage };

  } catch (error) {
    console.error("Error al crear el mensaje:", error);
    return { error: "No se pudo enviar el mensaje." };
  }
};