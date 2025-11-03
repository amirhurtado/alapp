
import { getPostByIdAction } from "@/actions/post/getPost";
import BackNavigation from "@/components/ui/BackNavigation";
import FullEditPostView from "@/features/post/components/FullEditPostView";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{
    postId: string;
  }>;
};

const page = async ({ params }: Props) => {
  const [{ postId }, currUser] = await Promise.all([params, currentUser()]);

  if(!postId) return

  const post = await getPostByIdAction(parseInt(postId));

  if(!post || !currUser) return notFound()

    if(post.authorId !== currUser.id){

      return <h1 className="p-4">No es tu post</h1>


    }

  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden">
      <BackNavigation title="Editar post" />
      <FullEditPostView post={post} />
    </div>
  );
};

export default page;
