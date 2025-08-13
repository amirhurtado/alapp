"use server";

import { prisma } from "@/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { uploadFile } from "./constants";

type ClerkUser = NonNullable<Awaited<ReturnType<typeof currentUser>>>;

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

export const getInfoProfileAction = async (userId: string) => {
  return await prisma.profile.findUnique({
    where: {
      userId,
    },
    select: {
      bio: true,
      location: true,
      website: true,
    },
  });
};

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

export const updateInfoUserAction = async (
  formData: FormData,
  userId: string
) => {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      displayName: true,
      imageUrl: true,
      profile: {
        select: {
          bio: true,
        },
      },
    },
  });

  if (!userData) return;
  const newDisplayName = formData.get("newDisplayName") as string;
  const file = formData.get("newImageUrl") as File;
  console.log(file);
  const newBio = formData.get("bio") as string;

  const userDataToUpdate: { displayName?: string, imageUrl?: string } = {};
  const profileDataToUpdate: { bio?: string } = {};
  let imgUrl : string | undefined = undefined

  if(file && file.size > 0){
    imgUrl = await  uploadFile(file, "/imgProfile")
  }

  if (userData.displayName !== newDisplayName) {
    userDataToUpdate.displayName = newDisplayName;
  }

  if(imgUrl){
    userDataToUpdate.imageUrl = imgUrl
  }

  if ((userData.profile?.bio ?? "") !== newBio) {
    profileDataToUpdate.bio = newBio;
  }

  if (Object.keys(userDataToUpdate).length > 0) {
    await prisma.user.update({
      where: { id: userId },
      data: userDataToUpdate,
    });
  }
  if (Object.keys(profileDataToUpdate).length > 0) {
    await prisma.profile.upsert({
      where: { userId },
      update: profileDataToUpdate,

      create: {
        userId,
        bio: profileDataToUpdate.bio,
      },
    });
  }

  
};

export const isFriendAction = async (
  userFollowerId: string,
  userFollowingId: string
) => {
  const isFriend = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: userFollowerId,
        followingId: userFollowingId,
      },
    },
  });

  if (isFriend) {
    return true;
  } else return false;
};

export const toggleFollowAction = async (
  userFollowerId: string,
  userFollowingId: string
) => {
  const isFriend = await isFriendAction(userFollowerId, userFollowingId);
  if (isFriend) {
    await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId: userFollowerId,
          followingId: userFollowingId,
        },
      },
    });
  } else {
    await prisma.follow.create({
      data: {
        followerId: userFollowerId,
        followingId: userFollowingId,
      },
    });
  }
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

export const getFollowsActions = async (userId: string, currentUserId : string) => {
  const [following, followers] = await Promise.all([
    prisma.follow.count({
      where: {
        followerId: userId,
      }
    }),
    prisma.follow.count({
      where: {
        followingId: userId,
      },
    }),
  ]);

  
    const isFriend = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUserId,
          followingId: userId
        }
      }
    })

  let findIsfriend = false
  if(isFriend){
    findIsfriend = true
  }else{
    findIsfriend = false
  }


  return { following, followers, findIsfriend}
};
