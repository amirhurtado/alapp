import React from "react";

import { getPostByIdAction } from "@/actions/post";
import { getCommentsAction } from "@/actions/comment";

import { currentUser } from "@clerk/nextjs/server";
import { getImgUrlAction } from "@/actions/user";
import BackNavigation from "@/components/ui/BackNavigation";
import FullPostView from "@/features/post/components/FullPostView";

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
    <div className="h-screen flex flex-col overflow-x-hidden overflow-y-auto">
      <BackNavigation title="Post" />
      <FullPostView  currentUser={{ id: currUser.id, imageUrl: imgUrlCurrentUser.imageUrl }} post={post} comments={comments} />
      
    </div>
  );
};

export default page;
