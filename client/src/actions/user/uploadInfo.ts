"use server"

import { prisma } from "@/prisma";
import { uploadFile } from "../constants";

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