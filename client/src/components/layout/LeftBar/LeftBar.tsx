'use client'
import Image from "next/image";
import Link from "next/link";

import { menuItems } from "@/constants";
import ModalCreatePost from "@/features/post/components/CreatePost/ModalCreatePost";

import { User as UserType } from "@/generated/prisma";

import UserProfiletab from "./UserProfiletab";
import { User } from "lucide-react";

const LeftBar = ({ currentUser }: { currentUser: UserType }) => {



  return (
    <div className="h-full  top-0 flex flex-col gap-6 justify-between pt-2 pb-8  ">
      <div className="relative left-[-.4rem] mt-1">
        <Link href="/" aria-label="ir a principal">
          <Image
            src={"/logo.svg"}
            alt="logo"
            width={50}
            height={50}
            className="w-[2.5rem] h-[2.5rem] md:w-[3rem] md:h-[3rem]"
          />
        </Link>
      </div>
      <div className=" font-poppins flex flex-col gap-3 justify-between flex-1 ">
        <div className="flex flex-col gap-2 ">
          {menuItems.map((item) => (
            <Link key={item.id} href={item.link} aria-label={item.arialLaberl}>
              <div className="flex gap-4 px-3 py-4 rounded-xl hover:bg-[#181818] ">
                <item.icon strokeWidth={1} />
                <span className="ml-2 hidden xxl:block ">{item.name}</span>
              </div>
            </Link>
          ))}
          <Link href={`/${currentUser?.name}`} aria-label="ir a perfil">
            <div className="flex gap-4 px-3 py-4 rounded-xl hover:bg-[#181818]">
              <User strokeWidth={1} />
              <span className="ml-2 hidden xxl:block ">Perfil</span>
            </div>
          </Link>
        </div>

        <ModalCreatePost currentUser={{id: currentUser.id, imgUrl: currentUser.imageUrl}} />
      </div>

      <UserProfiletab currentUser={currentUser} />
    </div>
  );
};

export default LeftBar;
