"use server";

import { prisma } from "@/prisma";

import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

export const shareAction = async (formData: FormData) => {
  //const text = formData.get("text") as string;
  const image = formData.get("image") as File;

  //console.log("Text:", text);

  const bytes = await image?.arrayBuffer();
  const buffer = Buffer.from(bytes);

  imagekit.upload(
    {
      file: buffer,
      fileName: image.name,
      folder: "/posts",
      transformation: {
        pre: "w-600",
      },
    },
    (error, result) => {
      if (error) {
        console.error("Error uploading image:", error);
      } else {
        console.log("Image uploaded successfully:", result);
      }
    }
  );
};

export const getPosts = async (id: string, feed: boolean) => {
  const users = [id];

  if (feed) {
    const following = await prisma.follow.findMany({
      where: {
        followerId: id,
      },
      select: {
        followingId: true,
      },
    });

    const followingIds = following.map((f) => f.followingId);

    users.push(...followingIds);
  }

  return await prisma.post.findMany({
    where: {
      authorId: {
        in: users,
      },
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          displayName: true,
          imageUrl: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  }) ;
};
