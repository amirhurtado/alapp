import React from "react";
import { Image } from "@imagekit/next";

const ImagePost = ({ postImageUrl }: { postImageUrl: string | null }) => {
  if (!postImageUrl) return;
  return (
    <div className="relative w-full max-w-[500px] h-[300px] mt-4 border border-border rounded-xl overflow-hidden">
      <Image
        src={postImageUrl}
        alt="Post image"
        fill
        priority
        className="object-cover"
      />
    </div>
  );
};

export default ImagePost;
