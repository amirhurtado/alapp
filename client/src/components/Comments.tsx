import React from "react";
import { Image } from "@imagekit/next";
import { Dot } from "lucide-react";
import PostInteractions from "./PostInteractions";

const Comment = () => {
  return (
    <div className="flex w-full gap-3 p-4 hover:bg-hover transition-colors duration-200 ease-in">
      {/* AVATAR */}
      <div className="w-10 h-10 relative overflow-hidden rounded-full">
        <Image
          src="/default-image.jpg"
          alt="Picture of the author"
          fill
          className="object-cover"
        />
      </div>

      <div className="w-full">
        {/* POST HEADER */}
        <div className="flex justify-between items-top">
          <div className="flex gap-1 items-center flex-1">
            <p className=" font-semibold text-[.92rem] cursor-pointer hover:underline">
              Username
            </p>
            <p className="text-text-gray text-[.83rem]">@username</p>
            <Dot size={10} className="text-text-gray" />
            <p className="text-text-gray text-[.83rem]">2h</p>
          </div>
          {/*<PostInfo />*/}
        </div>
        {/* POST TEXT & MEDIA */}
        <p className="text-[0.85rem] text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          numquam ducimus incidunt laudantium, quia nobis, quae.
        </p>

        <PostInteractions comment={true} />
      </div>
    </div>
  );
};

const Comments = () => {
  return (
    <div className="mt-3">
      {Array.from({ length: 10 }).map((_, index) => (
        <Comment key={index} />
      ))}
    </div>
  );
};

export default Comments;
