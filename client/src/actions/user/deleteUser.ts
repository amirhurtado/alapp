// actions/user/deleteUser.ts

"use server";

import { prisma } from "@/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const deleteAccountAction = async (password: string) => {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "Usuario no autenticado." };
  }

  try {
    // 👇 PASO 1: LLAMAR a clerkClient() y ESPERAR a que la promesa se resuelva.
    const client = await clerkClient();
    
    // 👇 PASO 2: Ahora que 'client' es el objeto real, SÍ podemos usar .users.
    await client.users.verifyPassword({
      userId,
      password,
    });

  } catch (error) {
    console.error("Error de verificación de contraseña:", error);
    return { success: false, error: "La contraseña que ingresaste es incorrecta." };
  }

  try {
    // Primero, eliminamos al usuario de nuestra base de datos de Prisma.
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    // Finalmente, eliminamos al usuario de Clerk.
    // Reutilizamos la misma lógica correcta.
    const client = await clerkClient();
    await client.users.deleteUser(userId);

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Error al eliminar la cuenta:", error);
    return {
      success: false,
      error: "No se pudo eliminar la cuenta. Por favor, contacta a soporte.",
    };
  }
};