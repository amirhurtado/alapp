"use server"
import { prisma } from "@/prisma";

export const markConversationAsReadAction = async (
  currentUserId: string,
  otherUserId: string
) => {
  try {
    const conversation = await prisma.conversation.findFirst({
      where: {
        OR: [
          { userAId: currentUserId, userBId: otherUserId },
          { userAId: otherUserId, userBId: currentUserId },
        ],
      },
    });

    if (!conversation) {
      return { success: true };
    }

    const dataToUpdate =
      conversation.userAId === currentUserId
        ? { userAUnreadCount: 0 }
        : { userBUnreadCount: 0 };

    await prisma.conversation.update({
      where: { id: conversation.id },
      data: dataToUpdate,
    });
    
    return { success: true };

  } catch (error) {
    console.error("Error al marcar como leído:", error);
    return { error: "No se pudo actualizar la conversación." };
  }
};