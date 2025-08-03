import { MessageSquare, Upload } from "lucide-react";
import React from "react";
import Favorite from "./Favorite";
import Like from "./Like";
import Repost from "./Repost";
import Link from "next/link";

interface PostInteractionsProps {
  currentUserIdLog: string;

  nameAuthorPost: string;
  postId: number;

  interactionPost: {
    commentsNumber: number;
    reposts: string[];
    likes: string[];
    favorites: string[];
  };
}

const PostInteractions = ({
  currentUserIdLog,
  nameAuthorPost,
  postId,
  interactionPost,
}: PostInteractionsProps) => {
  return (
    <div className={`flex justify-between text-xs mt-6 text-text-gray`}>
      <Link
        href={`/${nameAuthorPost}/post/${postId}`}
        className="flex gap-1 items-center rounded-2xl  group cursor-pointer hover:text-icon-blue hover:scale-[1.05] transition-transform ease-in duration-200"
      >
        <MessageSquare size={18} />
        <p>{interactionPost.commentsNumber}</p>
      </Link>

      <Repost
        reposted={interactionPost.reposts.includes(currentUserIdLog)}
        reposts={interactionPost.reposts.length}
        currentUserIdLog={currentUserIdLog}
        postId={postId}
      />

      <Like
        liked={interactionPost.likes.includes(currentUserIdLog)}
        likes={interactionPost.likes.length}
        currentUserIdLog={currentUserIdLog}
        postId={postId}
      />

      <>
        <div className="flex gap-4 items-center  ">
          <Favorite
            inFavorite={interactionPost.favorites.includes(currentUserIdLog)}
            currentUserIdLog={currentUserIdLog}
            postId={postId}
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
