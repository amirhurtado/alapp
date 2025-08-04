import { Repeat2 } from "lucide-react";
import PostInteractions from "./PostInteractions/PostInteractions";

import Avatar from "../../Profile/Avatar";
import { FullPostType } from "@/types";

import ImagePost from "./ImagePost";
import PostHeader from "./PostHeader";

interface PostProps {
  post: FullPostType;
  currentUserIdLog: string;
}

const Post = ({ post, currentUserIdLog }: PostProps) => {
  const isMyPost = currentUserIdLog === post.author.id;

  return (
    <div className="p-4 border-y-1 border-border hover:bg-hover transition-colors duration-200 ease-in">
      {/*reposted*/}

      {post.reposts.map((rep) => rep.userId).includes(currentUserIdLog) && (
        <div className="flex items-center gap-2 text-sm mb-2 text-text-gray">
          <Repeat2 size={16} />
          <p className="text-xs">Has reposteado</p>
        </div>
      )}

      <div className="flex w-full gap-3">
        {/* AVATAR */}
        <Avatar src={post.author.imageUrl || "user-default"} />

        <div className="w-full">
          {/* POST HEADER */}
          <PostHeader
            isMyPost={isMyPost}
            author={{
              name: post.author.name,
              displayName: post.author.name,
            }}
            createdAt={post.createdAt}
          />

          {/* POST TEXT & MEDIA */}
          <div className="mt-1">
            <p className="text-[0.85rem] text-gray-300">
              {post.description || ""}
            </p>

            <ImagePost postImageUrl={post.imageUrl} />
          </div>

          <PostInteractions
            currentUserIdLog={currentUserIdLog}
            nameAuthorPost={post.author.name}
            postId={post.id}
            interactionPost={{
              commentsNumber: post._count.comments,
              reposts: post.reposts.map((rep) => rep.userId),
              likes: post.likesPost.map((like) => like.userId),
              favorites: post.favorites.map((fav) => fav.userId),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
