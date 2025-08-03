import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Comments from "@/components/Feed/Comments/Comments";
import Post from "@/components/Feed/Post/Post";
import { getPostById } from "@/actions/post";
import { currentUser } from "@clerk/nextjs/server";

type Props = {
  params: {
    postId: string;
  };
};

const page = async ({ params }: Props) => {
  const { postId } = await params;

  const post = await getPostById(parseInt(postId));

  const currUser = await currentUser();

  if (!post || !currUser) return;

  return (
    <div className="h-screen flex flex-col overflow-hidden overflow-y-scroll">
      <div className="bg-[#00000084] p-3 flex gap-9 items-center backdrop-blur-md z-10 sticky top-0 border-b-1 border-border">
        <Link aria-label="Ir a principal" href="/">
          <ArrowLeft size={20} className="cursor-pointer" />
        </Link>
        <div className="flex flex-col ">
          <p className="font-semibold text-md">Post</p>
        </div>
      </div>

      <Post post={post} currentUserIdLog={currUser.id} />
      <Comments currentUserId={currUser.id} userImageUrl={post.author.imageUrl} userId={post.authorId}  postId={parseInt(postId)} />
    </div>
  );
};

export default page;
