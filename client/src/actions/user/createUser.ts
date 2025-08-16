"use server"

import { prisma } from "@/prisma";


type ClerkUser = NonNullable<Awaited<ReturnType<typeof currentUser>>>;

import { currentUser } from "@clerk/nextjs/server";


export const userExistsAction = async (user: ClerkUser) => {
  const response = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (response) {
    return response;
  } else {
    const dbUser = await prisma.user.create({
      data: {
        id: user.id,
        name: user.username || "",
        displayName: user.username || "",
        email: user.emailAddresses[0].emailAddress,
      },
    });

    return dbUser;
  }
};