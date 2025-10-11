

"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export const changePasswordAction = async ({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) => {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "Usuario no autenticado." };
  }

  try {
    // 👇 LA LÓGICA CORRECTA (igual que en deleteAccountAction)
    // 1. Obtenemos la instancia del cliente primero.
    const client = await clerkClient();

    // 2. Verificamos la contraseña actual usando la instancia 'client'.
    await client.users.verifyPassword({
      userId,
      password: currentPassword,
    });

    // 3. Actualizamos la contraseña usando la misma instancia 'client'.
    await client.users.updateUser(userId, {
      password: newPassword,
    });

    return { success: true };

  }catch (error: unknown) {
  let errorMessage = "Ocurrió un error inesperado.";

  if (typeof error === "object" && error !== null && "errors" in error) {
    const err = error as { errors?: { longMessage?: string }[] };
    errorMessage = err.errors?.[0]?.longMessage || errorMessage;
  }

  return { success: false, error: errorMessage };
}

};