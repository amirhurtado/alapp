"use client";

import { FullCommentType, FullPostType } from "@/types";
import CommentSection from "@/features/post/components/Comments/CommentSection";
import PostCard from "@/features/post/components/PostCard";
import { useQuery } from "@tanstack/react-query";

interface FullPostView {
  currentUser: {
    id: string;
    imageUrl: string;
  };

  post: FullPostType;
  comments: FullCommentType[];
}

const FullPostView = ({
  currentUser,
  post: originalPost,
  comments,
}: FullPostView) => {
  const queryKey = ["post", originalPost.authorId, originalPost.id];

  const { data } = useQuery({
    queryKey,
     queryFn: () => originalPost,
    initialData: originalPost,
    enabled: false
  });

  return (
    <>
      <PostCard
        post={data}
        currentUserId={currentUser.id}
        queryKey={queryKey}
      />
      <CommentSection
        comments={comments}
        currentUser={{ id: currentUser.id, imgUrl: currentUser.imageUrl }}
        postId={originalPost.id}
      />
    </>
  );
};

export default FullPostView;
