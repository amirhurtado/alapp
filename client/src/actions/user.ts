"use server";

import { prisma } from "@/prisma";
import { currentUser } from "@clerk/nextjs/server";

type ClerkUser = NonNullable<Awaited<ReturnType<typeof currentUser>>>;

export const userExists = async (user : ClerkUser) => {
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
        name: user.username || '',
        displayName: user.username || '',
        email: user.emailAddresses[0].emailAddress,
        imageUrl: "/user-default", 
      },
    });

    return dbUser;
  }
};

export const getUserbyName = async (username: string) => {
  return await prisma.user.findUnique({
    where: {
      name: username,
    },
    include: {
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true,
        }
      }
    }
  });
};
