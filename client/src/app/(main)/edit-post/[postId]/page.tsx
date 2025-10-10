import { getPostByIdAction } from "@/actions/post/getPost";
import BackNavigation from "@/components/ui/BackNavigation";
import FullEditPostView from "@/features/post/components/FullEditPostView";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{
    postId: string;
  }>;
};

const page = async ({ params }: Props) => {
  const [{ postId }] = await Promise.all([params]);

  if(!postId) return

  const post = await getPostByIdAction(parseInt(postId));

  if(!post) return notFound()

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <BackNavigation title="Editar post" />
      <FullEditPostView post={post} />
    </div>
  );
};

export default page;
