"use server";

import Feed from "@/components/Feed/Feed";
import CreatePost from "@/components/Sections/CreatePost/CreatePost";
import Link from "next/link";

import { currentUser } from "@clerk/nextjs/server";
import { userExistsAction } from "@/actions/user";
import SetUserClient from "@/components/SetUserClient";
import { getPostsAction } from "@/actions/post";


export default async function Home() {

  const currUser = await currentUser();

  if(!currUser) return


  const [dbUser, posts] = await Promise.all([
     userExistsAction(currUser),
     getPostsAction(currUser.id, true)
  ])

  

  return (
    <div className="h-screen flex flex-col overflow-hidden px-2">
      <SetUserClient dbUser={dbUser} />
      <div className="flex w-full justify-between items-end font-sans text-[.9rem] pt-[1rem] border-b-1 border-border font-semibold">
        <Link aria-label="Ir a para tí" href={"/"} className="w-full flex flex-col">
          <p className="text-center border-b-3 border-icon-blue pb-2">
            Principal
          </p>
        </Link>
        <Link  aria-label="Ir a siguiendo" href={"/"} className="w-full">
          <p className="text-center text-text-gray pb-2">Explorar</p>
        </Link>
      </div>

      <div className="flex flex-col max-h-screen  overflow-y-scroll">
        <CreatePost />
        <Feed posts={posts} currentUserIdLog={currUser.id} feed={true}  />
      </div>
    </div>
  );
}
