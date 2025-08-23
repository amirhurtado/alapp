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
      id: user.id,
    },
    update: {

      name: user.username || user.id,
      displayName:
        `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
        user.username ||
        "Usuario",
    },
    create: {
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
