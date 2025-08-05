import React from "react";
import CommentList from "@/features/post/components/Comments/CommentList";
import PostCard from "@/features/post/components/PostCard";
import { getPostByIdAction } from "@/actions/post";
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

  const [currUser, post] = await Promise.all([
    currentUser(),
    getPostByIdAction(parseInt(postId)),

  ]);

  if (!post || !currUser) return;

  const imgUrlCurrentUser = await getImgUrlAction(currUser.id);

  if (!imgUrlCurrentUser) return;

  return (
    <div className="h-screen flex flex-col overflow-x-hidden overflow-y-scroll">
      <BackNavigation title="Post" />

      <PostCard post={post} currentUserId={currUser.id} />
      <CommentList
        currentUser={{ id: currUser.id, imgUrl: imgUrlCurrentUser.imageUrl }}
        postId={parseInt(postId)}
      />
    </div>
  );
};

export default page;
