import React from 'react'
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Post from '@/components/Post';
import Comments from '@/components/Feed/Comments';

const page = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden overflow-y-scroll">
      <div className="bg-[#00000084] p-3 flex gap-9 items-center backdrop-blur-md z-10 sticky top-0 border-b-1 border-border">
        <Link href="/">
          <ArrowLeft size={20} className="cursor-pointer" />
        </Link>
        <div className="flex flex-col ">
          <p className="font-semibold text-md">Post</p>
        </div>
      </div>

      <Post />
      <Comments />
    </div>
  )
}

export default page
