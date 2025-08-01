"use server";

import Feed from "@/components/Feed/Feed";
import CreatePost from "@/components/Sections/CreatePost/CreatePost";
import Link from "next/link";

import { currentUser } from "@clerk/nextjs/server";
import { userExists } from "@/actions/user";
import SetUserClient from "@/components/SetUserClient";
import { getPosts } from "@/actions/post";

import { FullPostType } from "@/types";

export default async function Home() {
  const currUser = await currentUser();

  let dbUser = null;
  let posts = Array<FullPostType>();

  if (currUser) {
    dbUser = await userExists(currUser);
    posts = await getPosts(currUser.id, true);
  }

  return (
    <div className="h-full overflow-hidden px-2">
      <SetUserClient dbUser={dbUser} />
      <div className="flex w-full justify-between items-end font-sans text-[.9rem] pt-[1rem] border-b-1 border-border font-semibold">
        <Link aria-label="Ir a para tí" href={"/"} className="w-full flex flex-col">
          <p className="text-center border-b-3 border-icon-blue pb-2">
            Para tí
          </p>
        </Link>
        <Link  aria-label="Ir a siguiendo" href={"/"} className="w-full">
          <p className="text-center text-text-gray pb-2">Siguiendo</p>
        </Link>
      </div>

      <div className="flex flex-col h-full  overflow-y-scroll">
        <CreatePost />
        <Feed posts={posts} currentUserId={currUser!.id} feed={true}  />
      </div>
    </div>
  );
}
