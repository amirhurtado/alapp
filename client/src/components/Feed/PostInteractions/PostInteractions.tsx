"use client";

import { MessageSquare, Upload } from "lucide-react";
import React from "react";
import Favorite from "./Favorite";
import Like from "./Like";
import Repost from "./Repost";

interface PostInteractionsProps {
  comment?: boolean;
  currentUserId: string;
  currentPostId: number;
  reposts: string[];
  likes: string[];
  favorites: string[];
}

const PostInteractions = ({
  comment = false,
  currentUserId,
  currentPostId,
  reposts,
  likes,
  favorites,
}: PostInteractionsProps) => {
  return (
    <div
      className={`flex ${
        comment ? "justify-end gap-8" : "justify-between"
      } text-xs mt-6 text-text-gray`}
    >
      <div className="flex gap-1 items-center rounded-2xl  group cursor-pointer hover:text-icon-blue hover:scale-[1.05] transition-transform ease-in duration-200">
        <MessageSquare size={18} />
        <p>127</p>
      </div>

      {!comment && (
        <Repost repost={reposts.includes(currentUserId)} reposts={reposts.length} currentUserId={currentUserId} currentPostId={currentPostId} />
      )}

      <Like
        like={likes.includes(currentUserId)}
        likesNumber={likes.length}
        currentUserId={currentUserId}
        currentPostId={currentPostId}
      />

      {!comment && (
        <>
          <div className="flex gap-4 items-center  ">
            <Favorite
              favorite={favorites.includes(currentUserId)}
              currentUserId={currentUserId}
              currentPostId={currentPostId}
            />
            <Upload
              size={18}
              className=" text-text-gray hover:text-icon-blue cursor-pointer transition-colors duration-200 ease-in"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PostInteractions;
