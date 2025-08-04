import { FullPostType } from "@/types";

import { MessageSquare, Upload } from "lucide-react";
import React from "react";
import Favorite from "./Favorite";
import Like from "./Like";
import Repost from "./Repost";
import Link from "next/link";

interface PostInteractionsProps {
  currentUserIdLog: string;
  post: FullPostType
}

const PostInteractions = ({
  currentUserIdLog,
  post
}: PostInteractionsProps) => {
  return (
    <div className={`flex justify-between text-xs mt-6 text-text-gray`}>
      <Link
        href={`/${post.author.name}/post/${post.id}`}
        className="flex gap-1 items-center rounded-2xl  group cursor-pointer hover:text-icon-blue hover:scale-[1.05] transition-transform ease-in duration-200"
      >
        <MessageSquare size={18} />
        <p>{post._count.comments}</p>
      </Link>

      <Repost
        reposts={post.reposts}
        currentUserIdLog={currentUserIdLog}
        postId={post.id}
      />

      <Like
        liked={interactionPost.likes.includes(currentUserIdLog)}
        likes={interactionPost.likes.length}
        currentUserIdLog={currentUserIdLog}
        postId={post.id}
      />

      <>
        <div className="flex gap-4 items-center  ">
          <Favorite
            inFavorite={interactionPost.favorites.includes(currentUserIdLog)}
            currentUserIdLog={currentUserIdLog}
            postId={post.id}
          />
          <Upload
            size={18}
            className=" text-text-gray hover:text-icon-blue cursor-pointer transition-colors duration-200 ease-in"
          />
        </div>
      </>
    </div>
  );
};

export default PostInteractions;
