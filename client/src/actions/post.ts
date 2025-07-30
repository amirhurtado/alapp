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


export const getPosts = async () => {
  return await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          displayName: true,
          imageUrl: true,
        }
      },
    }
  });
}