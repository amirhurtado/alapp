"use server";
import { prisma } from "@/prisma";

export const getUserbyNameAction = async (username: string) => {
  return await prisma.user.findUnique({
    where: {
      name: username,
    },
    include: {
      profile: true,
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });
};

export const getImgUrlAction = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      imageUrl: true,
    },
  });
};

export const getRecomentationsAction = async (
  userId: string,
  alreadyFetchedIds: string[]
) => {
  const following = await prisma.follow.findMany({
    where: {
      followerId: userId,
    },
  });

  const followingIds = following.map((follow) => follow.followingId);
  const exclusion = Array.from(
    new Set([...followingIds, userId, ...(alreadyFetchedIds ?? [])])
  );

  const recommendations = await prisma.user.findMany({
    where: {
      NOT: {
        id: {
          in: exclusion,
        },
      },
    },
    take: 3,
    select: {
      id: true,
      name: true,
      displayName: true,
      imageUrl: true,
    },
  });

  const usersWithFriendStatus = recommendations.map((user) => ({
    ...user,
    isFriend: followingIds.includes(user.id),
  }));

  return usersWithFriendStatus;
};

export const getUsersInSearchAction = async (
  query: string | undefined,
  currentUserId: string,
  page: number = 1
) => {
  if (!query) return [];

  const skip = (page - 1) * 10;
  const [users, myFollowings] = await Promise.all([
    prisma.user.findMany({
      where: {
        AND: {
          name: {
            contains: query,
          },
          NOT: {
            id: currentUserId,
          },
        },
      },
      take: 10,
      skip,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.follow.findMany({
      where: {
        followerId: currentUserId,
      },
    }),
  ]);

  const myFollowingsId = myFollowings.map((following) => following.followingId);

  const usersWithFriendStatus = users.map((user) => {
    return {
      ...user,
      isFriend: myFollowingsId.includes(user.id),
    };
  });

  return usersWithFriendStatus;
};





export type MentionableUser = {
  id: string;
  name: string; // En tu esquema es 'name', no 'username'
  displayName: string;
  imageUrl: string;
  isFollowedByYou: boolean; // La propiedad clave que necesitamos
};

export const getMentionableUsersAction = async (
  query: string | undefined,
  currentUserId: string
): Promise<MentionableUser[]> => {
  // 1. Si no hay consulta o es muy corta, no devolvemos nada.
  if (!query || query.trim().length < 1) {
    return [];
  }

  try {
    const [usersFound, yourFollowers] = await Promise.all([
      prisma.user.findMany({
        where: {
          name: {
            contains: query,
          },
          NOT: {
            id: currentUserId,
          },
        },
        take: 25, 
        select: {
          id: true,
          name: true,
          displayName: true,
          imageUrl: true,
        },
      }),
      prisma.follow.findMany({
        where: {
          followingId: currentUserId,
        },
        select: {
          followerId: true, // Solo necesitamos el ID de quien nos sigue.
        },
      }),
    ]);

    // 3. Para una búsqueda rápida, creamos un Set con los IDs de nuestros seguidores.
    // Un Set es mucho más rápido que un Array.includes() para verificar si un elemento existe.
    const yourFollowerIds = new Set(
      yourFollowers.map((follower) => follower.followerId)
    );

    // 4. Mapeamos los resultados para añadir la propiedad `isFollowedByYou`.
    const usersWithFollowStatus = usersFound.map((user) => {
      return {
        ...user,
        // Verificamos si el ID de este usuario está en nuestro Set de seguidores.
        isFollowedByYou: yourFollowerIds.has(user.id),
      };
    });

    return usersWithFollowStatus;
  } catch (error) {
    console.error("Error en getMentionableUsersAction:", error);
    // En caso de error, devolvemos un array vacío para no romper el frontend.
    return [];
  }
};