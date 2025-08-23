"use server";

import { prisma } from "@/prisma";
import { currentUser } from "@clerk/nextjs/server";

type ClerkUser = NonNullable<Awaited<ReturnType<typeof currentUser>>>;

export const userExistsAction = async (user: ClerkUser) => {
  console.log("Sincronizando usuario con la base de datos:", user);

  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) {
    throw new Error("La dirección de email es requerida.");
  }
  const dbUser = await prisma.user.upsert({
    where: {
      // El campo único que usamos para buscar al usuario
      id: user.id,
    },
    update: {
      // Campos que se actualizarían si el usuario ya existe.
      // Podemos aprovechar para actualizar su nombre si lo cambió en GitHub.
      name: user.username || user.id,
      displayName:
        `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
        user.username ||
        "Usuario",
    },
    create: {
      // Datos que se usarán para crear el usuario si NO existe.
      id: user.id,
      email: email,
      name: user.username || user.id,
      displayName:
        `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
        user.username ||
        "Usuario",
    },
  });

  console.log("Usuario sincronizado correctamente:", dbUser.id);
  return dbUser;
};
