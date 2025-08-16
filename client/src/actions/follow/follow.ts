"use server"
import { prisma } from "@/prisma";

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
