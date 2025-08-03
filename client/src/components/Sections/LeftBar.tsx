import Image from "next/image";
import Link from "next/link";

import { menuItems } from "@/constants";
import { Ellipsis, User } from "lucide-react";
import ModalCreatePost from "./CreatePost/ModalCreatePost";

import { User as UserType} from '@/generated/prisma'

import Avatar from "../Avatar";

const LeftBar = ({currentUserLog} : {currentUserLog : UserType} ) => {

  return (
    <div className="h-full  top-0 flex flex-col gap-6 justify-between pt-2 pb-8 ">
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
      <div className=" font-poppins flex flex-col gap-3 justify-between flex-1">
        <div className="flex flex-col gap-2 ">
          {menuItems.map((item) => (
            <Link key={item.id} href={item.link} aria-label={item.arialLaberl}>
              <div className="flex gap-4 px-3 py-4 rounded-xl hover:bg-[#181818]">
                <item.icon strokeWidth={1} />
                <span className="ml-2 hidden xxl:block ">{item.name}</span>
              </div>
            </Link>
          ))}
          <Link href={`/${currentUserLog?.name}`} aria-label="ir a perfil">
              <div className="flex gap-4 px-3 py-4 rounded-xl hover:bg-[#181818]">
                <User strokeWidth={1} />
                <span className="ml-2 hidden xxl:block ">Perfil</span>
              </div>
            </Link>
        </div>

        <ModalCreatePost />
      </div>

      <Link href={`/${currentUserLog?.name}`} arial-label="Ir al perfil" className="flex xxl:px-3 xxl:py-2 rounded-xl xxl:bg-[#181818] cursor-pointer">
        <Avatar src={currentUserLog?.imageUrl || 'user-default'} />
        <div className="flex-1 hidden xxl:flex flex-col ml-3 justify-center">
          <p className="text-[.8rem] font-bold">{currentUserLog?.name}</p>
          <p className="text-text-gray-light text-[.75rem] text-gray-400">
            @{currentUserLog?.displayName}
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
