import React from "react";
import CommentSection from "@/features/post/components/Comments/CommentSection";
import PostCard from "@/features/post/components/PostCard";
import { getPostByIdAction } from "@/actions/post";
import { getCommentsAction } from "@/actions/comment";

import { currentUser } from "@clerk/nextjs/server";
import { getImgUrlAction } from "@/actions/user";
import BackNavigation from "@/components/ui/BackNavigation";

type Props = {
  params: {
    postId: string;
  };
};

const page = async ({ params }: Props) => {
  const { postId } = await params;

  const [currUser, post, comments] = await Promise.all([
    currentUser(),
    getPostByIdAction(parseInt(postId)),
    getCommentsAction(parseInt(postId)),
  ]);

  if (!post || !currUser) return;

  const imgUrlCurrentUser = await getImgUrlAction(currUser.id);

  if (!imgUrlCurrentUser) return;

  return (
    <div className="h-screen flex flex-col overflow-x-hidden overflow-y-scroll">
      <BackNavigation title="Post" />
      <PostCard post={post} currentUserId={currUser.id} />
      <CommentSection
        comments={comments}
        currentUser={{ id: currUser.id, imgUrl: imgUrlCurrentUser.imageUrl }}
        postId={parseInt(postId)}
      />
    </div>
  );
};

export default page;
