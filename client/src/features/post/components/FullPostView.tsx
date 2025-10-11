"use client";

import { FullCommentType, FullPostType } from "@/types";
import CommentSection from "@/features/post/components/Comments/CommentSection";
import PostCard from "@/features/post/components/PostCard";
import { useQuery } from "@tanstack/react-query";
import { getPostByIdAction } from "@/actions/post/getPost";

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
  const queryKey = ["post", { id: originalPost.id }];

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => getPostByIdAction(originalPost.id),

    initialData: originalPost,
    
  });
  
  if (isLoading && !data) {
      return <div>Cargando...</div>
  }

  if (!data) {
      return <div>No se encontró el post.</div>
  }

  return (
    <>
      <PostCard
        post={data!}
        currentUserId={currentUser.id}
        queryKey={queryKey}
        fromPostInfo={true}
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