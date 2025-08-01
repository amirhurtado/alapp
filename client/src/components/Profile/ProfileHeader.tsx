import React from "react";

import Link from "next/link";
import { ArrowLeft, CalendarX, MapPin } from "lucide-react";
import Image from "next/image";
import { Image as Imagekit } from "@imagekit/next";

import { User as UserType } from "@/generated/prisma";
import ProfileActions from "./ProfileActions";

interface ProfileHeaderProps {
  userProfileInfo: UserType & {
    _count: {
      posts: number;
      followers: number;
      following: number;
    };
  };
  currentUserId: string;
  currentUserName: string;
}

const ProfileHeader = ({
  userProfileInfo,
  currentUserId,
  currentUserName,
}: ProfileHeaderProps) => {
  const myProfile = currentUserName === userProfileInfo.name;


  return (
    <>
      <div className="bg-[#00000084] p-3 flex gap-9 items-center backdrop-blur-md z-10 sticky top-0">
        <Link href="/" aria-label="volver">
          <ArrowLeft size={20} className="cursor-pointer" />
        </Link>
        <div className="flex flex-col ">
          <p className="font-semibold text-md">{myProfile ? "Tu perfil" : userProfileInfo.name}</p>
          <p className="text-xs text-text-gray">{userProfileInfo._count.posts} posts</p>
        </div>
      </div>
      <div className="relative flex flex-col mb-6">
        {/* Profile Header */}
        <div>
          <div className="relative w-full h-[120px] md:h-[200px] border-y-1 border-border">
            <Image
              src={"/base-image-profile.webp"}
              alt="Profile Background"
              fill
              className=" object-cover"
            />
          </div>
          <div className="absolute -translate-y-1/2 left-4 w-[4.5rem] h-[4.5rem] md:w-[6rem] md:h-[6rem]">
            <Imagekit
              src="/user-default"
              alt="User Avatar"
              fill
              className="object-cover rounded-full border-2 border-black"
            />
          </div>

          <ProfileActions myProfile={myProfile} currentUserId={currentUserId} userProfileInfoId={userProfileInfo.id} />
        </div>

        {/* Profile Info */}
        <div className="px-4 mt-2 ">
          <h1 className="text-2xl font-semibold">{userProfileInfo.name}</h1>
          <p className="text-sm text-text-gray">@{userProfileInfo.displayName}</p>

          <p className="mt-3 text-sm">Descipcion de gustos</p>

          <div className="flex gap-5 mt-1 text-text-gray text-sm">
            <div className="flex items-center gap-1">
              <MapPin size={16} className="" />
              <span>Pais</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarX size={16} className="" />
              <span>Se unió en {new Date(userProfileInfo.createdAt.toString()).toLocaleString("es-CO", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}</span>
            </div>
          </div>

          <div className="flex gap-5 mt-3">
            <div className="flex items-end gap-1 hover:underline cursor-pointer">
              <p className="text-sm">{userProfileInfo._count.following}</p>
              <span className="text-text-gray text-xs">Siguiendo</span>
            </div>
            <div className="flex items-end gap-1 hover:underline cursor-pointer ">
              <p className="text-sm">{userProfileInfo._count.followers}</p>
              <span className="text-text-gray text-xs">Seguidores</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
