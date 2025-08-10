"use server";

import { prisma } from "@/prisma";

import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

const postIncludes = {
  author: {
    select: {
      id: true,
      name: true,
      displayName: true,
      imageUrl: true,
    },
  },
  likesPost: {
    select: { userId: true },
  },
  favorites: {
    select: { userId: true },
  },
  reposts: {
    select: { userId: true },
  },
  _count : {
    select : {
      comments : true
    }
  }
};


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

  const post = await  prisma.post.create({
    data: {
      authorId,
      description,
      imageUrl: urlImage,
    },
    include: postIncludes
  });


  return post
};


export const getPostByIdAction = async (postId: number) => {
  return await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: postIncludes
  });
};

export const getPostsAction = async (
  currentUserId: string,
  feed: boolean,
  page: number = 1
) => {
  const users = [currentUserId];
  const skip = (page - 1) * 10;

  if (feed) {
    const following = await prisma.follow.findMany({
      where: {
        followerId: currentUserId,
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
    include: postIncludes,
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const toggleLikePostAction = async (postId: number, userId: string) => {
  const existLike = await prisma.likePost.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  if (existLike) {
    await prisma.likePost.delete({
      where: {
        id: existLike.id,
      },
    });
  } else {
    await prisma.likePost.create({
      data: {
        postId,
        userId,
      },
    });
  }

  return  await prisma.post.findUnique({
    where : {
      id: postId
    },
    include : postIncludes
  })

};

export const toggleFavoriteAction = async (postId: number, userId: string) => {
  const existFavorite = await prisma.favorite.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  if (existFavorite) {
    await prisma.favorite.delete({
      where: {
        id: existFavorite.id,
      },
    });
  } else {
    await prisma.favorite.create({
      data: {
        postId,
        userId,
      },
    });
  }
  return;
};

export const toggleRepostAction = async (postId: number, userId: string) => {
  const existRepost = await prisma.repost.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  if (existRepost) {
    await prisma.repost.delete({
      where: {
        id: existRepost.id,
      },
    });
  } else {
    await prisma.repost.create({
      data: {
        userId,
        postId,
      },
    });
  }
};
