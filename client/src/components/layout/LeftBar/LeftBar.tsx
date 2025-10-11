"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react"; // 👈 1. Importar useEffect

import { getMenuItems } from "@/constants";
import ModalCreatePost from "@/features/post/components/CreatePost/ModalCreatePost";
import { User as UserType } from "@/generated/prisma";
import UserProfiletab from "./UserProfiletab";
import Socket from "@/components/Socket";
import { useNotificationCount } from "@/store/useNotification";
import { useGlobalMessageUnreadCount } from "@/store/GlobalMessageUnreadCountStore";

const LeftBar = ({
  currentUser,
  unreadMessageCount, // Esta prop viene del servidor
}: {
  currentUser: UserType;
  unreadMessageCount: number;
}) => {
  const menuItems = getMenuItems(currentUser.name);

  const countNoti = useNotificationCount((state) => state.count);

  const {
    count: unreadMessagesCountFromStore,
    setCount: setUnreadMessagesCount,
  } = useGlobalMessageUnreadCount();

  useEffect(() => {
    setUnreadMessagesCount(unreadMessageCount);
  }, []); 

  return (
    <div className="h-full top-0 flex flex-col gap-6 justify-between pt-2 pb-8">
      {/* ... (el resto de tu JSX no cambia) ... */}
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
      <div className="font-poppins flex flex-col gap-3 justify-between flex-1">
        <div className="flex flex-col gap-6 md:gap-2">
          {menuItems.map((item) => (
            <Link key={item.id} href={item.link} aria-label={item.arialLaberl}>
              <div className="flex gap-4 p-1 md:px-3 md:py-4 rounded-xl md:hover:bg-[#181818] relative">
                <item.icon strokeWidth={1} />
                <span className="ml-2 hidden xxl:block">{item.name}</span>
                {item.name === "Notificaciones" && countNoti > 0 && (
                  <span className="absolute left-[1.4rem] top-[.5rem] flex items-center justify-center w-4 h-4 rounded-full bg-primary-color text-[10px] text-white">
                    {countNoti}
                  </span>
                )}
                {item.name === "Mensajes" &&
                  unreadMessagesCountFromStore > 0 && (
                    <span className="absolute left-[1.4rem] top-[.5rem] flex items-center justify-center w-4 h-4 rounded-full bg-icon-green text-[10px] text-white">
                      {unreadMessagesCountFromStore}
                    </span>
                  )}
              </div>
            </Link>
          ))}
        </div>
        <ModalCreatePost
          currentUser={{ id: currentUser.id, imgUrl: currentUser.imageUrl }}
        />
      </div>
      <UserProfiletab currentUser={currentUser} />
      <Socket />
    </div>
  );
};

export default LeftBar;