import { FullPostType } from "@/types";

import { MessageSquare } from "lucide-react";
import React from "react";
import Favorite from "./Favorite";
import Like from "./Like";
import Repost from "./Repost";
import Link from "next/link";
import OtherOptionsPost from "./OtherOptionsPost";

interface PostInteractionsProps {
  currentUserId: string;
  post: FullPostType;
  interactions: {
    onLike: () => void,
    onFavorite: () => void
    onRepost: () => void
    onDelete: () => void
  }
  fromPostInfo?: boolean
}

const PostInteractions = ({
  currentUserId,
  post,
  interactions,
  fromPostInfo
}: PostInteractionsProps) => {

 
  return (
    <div className={`flex justify-between text-xs mt-6 text-text-gray`}>
      <Link
        href={`/${post.author.name}/post/${post.id}`}
        className="flex gap-1 items-center rounded-2xl  group cursor-pointer hover:text-primary-color hover:scale-[1.05] transition-transform ease-in duration-200"
      >
        <MessageSquare size={18} />
        <p>{post._count.comments}</p>
      </Link>

      <Repost
        reposts={post.reposts}
        currentUserId={currentUserId}
        onPost={interactions.onRepost}
      />

      <Like
        likes={post.likesPost}
        currentUserId={currentUserId}
        onLike={interactions.onLike}
      />

      <>
        <div className="flex gap-4 items-center  ">
          <Favorite
            favorites={post.favorites}
            currentUserId={currentUserId}
            onFavorite={interactions.onFavorite}
          />
          <OtherOptionsPost  onDelete={currentUserId === post.authorId ? interactions.onDelete : undefined} fromPostInfo={fromPostInfo}/>
        </div>
      </>
    </div>
  );
};

export default PostInteractions;
