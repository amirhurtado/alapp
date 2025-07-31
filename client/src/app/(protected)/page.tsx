import Feed from "@/components/Feed";
import Share from "@/components/Share";
import Link from "next/link";

import {  currentUser } from "@clerk/nextjs/server";
import { userExists } from "@/actions/user";
import SetUserClient from "@/components/SetUserClient";

export default async function Home() {
  const user = await currentUser();

  let dbUser = null;

  if(user) { 
    dbUser = await userExists(user)
  }


  return (
    <div className="h-full overflow-hidden px-2">
      <SetUserClient dbUser={dbUser} />
      <div className="flex w-full justify-between items-end font-sans text-[.9rem] pt-[1rem] border-b-1 border-border font-semibold">
        <Link href={"/"} className="w-full flex flex-col">
          <p className="text-center border-b-3 border-icon-blue pb-2">
            Para tí
          </p>
        </Link>
        <Link href={"/"} className="w-full">
          <p className="text-center text-text-gray pb-2">Siguiendo</p>
        </Link>
      </div>

      <div className="flex flex-col h-full  overflow-y-scroll">
        <Share />
        <Feed />
      </div>
    </div>
  );
}
