"use client";

import Image from "next/image";
import Link from "next/link";

import { menuItems } from "@/constants";
import { Ellipsis } from "lucide-react";
import ModalCreatePost from "./ModalCreatePost";

import { useUser } from "@/store/useUser";
import Avatar from "./Avatar";

const LeftBar = () => {
  const { currentUser } = useUser();

  return (
    <div className="h-full  top-0 flex flex-col gap-6 justify-between pt-2 pb-8 ">
      <div className="relative left-[-.4rem] mt-1">
        <Link href="/">
          <Image
            src={"/logo.svg"}
            alt="logo"
            width={50}
            height={50}
            className="w-[2.5rem] h-[2.5rem] md:w-[3rem] md:h-[3rem]"
          />
        </Link>
      </div>
      <div className=" font-poppins flex flex-col gap-3 justify-between flex-1">
        <div className="flex flex-col gap-2 ">
          {menuItems.map((item) => (
            <Link key={item.id} href={item.link}>
              <div className="flex gap-4 px-3 py-4 rounded-xl hover:bg-[#181818]">
                <item.icon strokeWidth={1} />
                <span className="ml-2 hidden xxl:block ">{item.name}</span>
              </div>
            </Link>
          ))}
        </div>

        <ModalCreatePost />
      </div>

      <Link href={`/${currentUser?.name}`} className="flex xxl:px-3 xxl:py-2 rounded-xl xxl:bg-[#181818] cursor-pointer">
        <Avatar src={currentUser?.imageUrl || 'user-default'} />
        <div className="flex-1 hidden xxl:flex flex-col ml-3 justify-center">
          <p className="text-[.8rem] font-bold">{currentUser?.name}</p>
          <p className="text-text-gray-light text-[.75rem] text-gray-400">
            @{currentUser?.displayName}
          </p>
        </div>
        <div className="hidden xxl:flex items-center cursor-pointer ml-7">
          <Ellipsis size={18} />
        </div>
      </Link>
    </div>
  );
};

export default LeftBar;
