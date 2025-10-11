// actions/messages/resetUnreadsMessage.ts

"use server";
import { prisma } from "@/prisma";

export const markConversationAsReadAction = async (
  currentUserId: string,
  otherUserId: string
) => {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const conversation = await tx.conversation.findFirst({
        where: {
          OR: [
            { userAId: currentUserId, userBId: otherUserId },
            { userAId: otherUserId, userBId: currentUserId },
          ],
        },
      });

      // Si no hay conversación, no había nada que leer.
      if (!conversation) {
        return 0
      }

      // 1. Guardamos el número de mensajes no leídos ANTES de resetearlo
      const unreadCountToDecrement =
        conversation.userAId === currentUserId
          ? conversation.userAUnreadCount
          : conversation.userBUnreadCount;

      // Si ya estaban en cero, no hacemos nada en la DB
      if (unreadCountToDecrement === 0) {
        return  0
      }
      
      const dataToUpdate =
        conversation.userAId === currentUserId
          ? { userAUnreadCount: 0 }
          : { userBUnreadCount: 0 };

      // 2. Ejecutamos la actualización
      await tx.conversation.update({
        where: { id: conversation.id },
        data: dataToUpdate,
      });

      // 3. Devolvemos el número de mensajes que acabamos de marcar como leídos
      return unreadCountToDecrement
    });

    return result;

  } catch (error) {
    console.error("Error al marcar como leído:", error);
    return 0
  }
};