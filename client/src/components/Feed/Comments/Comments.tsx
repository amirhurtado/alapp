import React from "react";

import { Dot } from "lucide-react";
import CreateComment from "./CreateComment";

const Comment = () => {
  return (
    <div className="flex w-full gap-3 p-4 hover:bg-hover transition-colors duration-200 ease-in border-y-1 border-border">
      {/* AVATAR */}

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
      </div>
    </div>
  );
};

interface CommentsProps {
  userId: string;
  userImageUrl: string;
  postId: number
}

const Comments = async ({ userId, userImageUrl, postId }: CommentsProps) => {
  
  return (
    <div className="flex flex-col gap-4 mt-3">
      <CreateComment userImageUrl={userImageUrl} postId={postId} userId={userId} />

      {Array.from({ length: 1 }).map((_, index) => (
        <Comment key={index} />
      ))}
    </div>
  );
};

export default Comments;
