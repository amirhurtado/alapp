import React from "react";
import Avatar from "@/components/ui/Avatar";
import { User as UserType } from "@/generated/prisma";

import {
   Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut } from "lucide-react";
import { useClerk } from "@clerk/nextjs";

const UserProfiletab = ({ currentUser }: { currentUser: UserType }) => {
  const {signOut} = useClerk();

  return (
    <Popover>
      <PopoverTrigger>
        {" "}
        <div
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
        </div>
      </PopoverTrigger>
      <PopoverContent side="right" className="flex flex-col gap-2 max-w-max py-[10px] border-none">

        <button onClick={() => signOut()} className="flex gap-4 items-center bg-red-400 px-3 py-2 rounded-lg cursor-pointer">
          <LogOut className="rotate-180" size={20} />
          <p className="text-sm font-bold">Salir</p>
        </button >

        
      </PopoverContent>
    </Popover>
  );
};

export default UserProfiletab;
