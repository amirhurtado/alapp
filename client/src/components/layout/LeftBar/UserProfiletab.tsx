import React from "react";
import { Ellipsis } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Link from "next/link";
import { User as UserType } from "@/generated/prisma";

const UserProfiletab = ({ currentUser }: { currentUser: UserType }) => {
  return (
    <Link
      href={`/${currentUser?.name}`}
      arial-label="Ir al perfil"
      className="flex xxl:px-3 xxl:py-2 rounded-xl xxl:bg-[#181818] cursor-pointer"
    >
      <Avatar src={currentUser?.imageUrl || "user-default"} />
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
  );
};

export default UserProfiletab;
