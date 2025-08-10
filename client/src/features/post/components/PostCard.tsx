import { FullPostType } from "@/types";

import PostInteractions from "./PostInteractions/PostInteractions";

import Avatar from "@/components/ui/Avatar";

import AuthorInfo from "./AuthorInfo";
import TimeAgo from "@/components/ui/TimeAgo";
import PostOptions from "./PostOptions";
import Body from "./Body";
import RepostIndicator from "./RepostIndicator";

import { useLikePostMutation } from "../hooks/useLikePostMutation";
import { useFavoriteMutation } from "../hooks/useFavoriteMutation";
import { useRepostMutation } from "../hooks/useRepostMutation";

interface PostProps {
  post: FullPostType;
  currentUserId: string;
  queryKey: any[];
}

const PostCard = ({ post, currentUserId, queryKey }: PostProps) => {
  const isMyPost = currentUserId === post.author.id;

  const likeMutation = useLikePostMutation(queryKey);
    const favoriteMutation = useFavoriteMutation(queryKey);
    const repostMutation = useRepostMutation(queryKey);

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

          <PostInteractions
            currentUserId={currentUserId}
            post={post}
            interactions={{
              onLike: () =>
                likeMutation.mutate({ postId: post.id, userId: currentUserId }),
              onFavorite: () =>
                favoriteMutation.mutate({
                  postId: post.id,
                  userId: currentUserId,
                }),
              onRepost: () =>
                repostMutation.mutate({
                  postId: post.id,
                  userId: currentUserId,
                }),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
