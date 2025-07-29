'use client'

import { Image } from "@imagekit/next";
import PostInfo from "./PostInfo";
import { Repeat2, Dot } from "lucide-react";
import PostInteractions from "./PostInteractions";

const Post = () => {
  return (
    <div className="p-4 border-y-1 border-border hover:bg-hover transition-colors duration-200 ease-in">
      {/*reposted*/}
      <div className="flex items-center gap-2 text-sm mb-2 text-text-gray">
        <Repeat2 size={16} />
        <p className="text-xs">Username ha reposteado</p>
      </div>
      {/*Post content*/}
      <div className="flex w-full gap-3">
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
            <PostInfo />
          </div>
          {/* POST TEXT & MEDIA */}
          <div className="mt-1">
            <p className="text-[0.85rem] text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio numquam ducimus incidunt laudantium, quia nobis, quae
              vel dicta explicabo ut alias similique ipsam, dignissimos esse
              inventore. Facere quod consectetur necessitatibus.
            </p>

    
            <Image
              src="/default-image.jpg"
              alt="Picture of the author"
              width={500}
              height={500}
              className="object-cover mt-4 border-1 border-border rounded-xl"
            />
          </div>

          <PostInteractions />
        </div>
      </div>
    </div>
  );
};

export default Post;
