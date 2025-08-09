import { FullPostType } from "@/types";

import PostInteractions from "./PostInteractions/PostInteractions";

import Avatar from "@/components/ui/Avatar";

import AuthorInfo from "./AuthorInfo";
import TimeAgo from "@/components/ui/TimeAgo";
import PostOptions from "./PostOptions";
import Body from "./Body";
import RepostIndicator from "./RepostIndicator";

interface PostProps {
  post: FullPostType;
  currentUserId: string;
  interactions: {
    onLike: () => void
    onFavorite: () => void
  }
}

const PostCard = ({ post, currentUserId, interactions }: PostProps) => {
  const isMyPost = currentUserId === post.author.id;

  return (
    <div className="p-4 border-y-1 border-border bg-[#0d0d0d] hover:bg-hover transition-colors duration-200 ease-in ">
      <RepostIndicator post={post} currentUserId={currentUserId} />

      <div className="flex w-full gap-3">
        <Avatar src={post.author.imageUrl || "user-default"} />

        <div className="w-full">
          <div className="flex flex-col ">
            <div className="flex justify-between items-top  ">
              <div className="flex gap-1 items-center flex-1">
                <AuthorInfo
                  isMyPost={isMyPost}
                  author={{
                    name: post.author.name,
                    displayName: post.author.name,
                  }}
                />

                <div className="hidden md:block ">
                  <TimeAgo createdAt={post.createdAt} />
                </div>
              </div>

              <PostOptions />
            </div>

            <div className="block md:hidden ">
              <TimeAgo createdAt={post.createdAt} />
            </div>
          </div>

          <Body
            postDescription={post.description}
            postImageUrl={post.imageUrl}
          />

          <PostInteractions currentUserId={currentUserId} post={post} interactions={interactions} />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
