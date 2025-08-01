"use server";

import { prisma } from "@/prisma";

import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

export const createPostAction = async (formData: FormData) => {
  const authorId = formData.get("authorId") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as File;

  let urlImage: string | undefined = undefined;

  if (image && image.size > 0) {
    const bytes = await image?.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const resultImage = await imagekit.upload({
      file: buffer,
      fileName: image.name,
      useUniqueFileName: true,
      folder: "/posts",
      transformation: {
        pre: "w-600",
      },
    });

    urlImage = resultImage?.url;
  }

  await prisma.post.create({
    data: {
      authorId,
      description,
      imageUrl: urlImage,
    },
  });
};

export const getPosts = async (id: string, feed: boolean, page : number = 1) => {
  const users = [id];
  const skip = (page - 1) * 10;

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
    skip: skip,
    take: 10,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          displayName: true,
          imageUrl: true,
        },

      },
      likesPost: {
        select: {
          userId: true,
        }
      },

      favorites: {
        select: {
          userId: true,
        }
      },
      comments: true,
      reposts: true
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
