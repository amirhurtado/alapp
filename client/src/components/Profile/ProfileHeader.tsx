import React from "react";

import Link from "next/link";
import { ArrowLeft, CalendarX, MapPin } from "lucide-react";
import Image from "next/image";
import { Image as Imagekit } from "@imagekit/next";

import ProfileActions from "./ProfileActions/ProfileActions";
import { FullUserType } from "@/types";

interface ProfileHeaderProps {
  userProfileInfo: FullUserType;
  currentUserIdLog: string;
  isMyProfile: boolean;
}

const ProfileHeader = ({
  userProfileInfo,
  currentUserIdLog,
  isMyProfile,
}: ProfileHeaderProps) => {
  return (
    <>
      <div className="bg-[#00000084] p-3 flex gap-9 items-center backdrop-blur-md z-10 sticky top-0">
        <Link href="/" aria-label="volver">
          <ArrowLeft size={20} className="cursor-pointer" />
        </Link>
        <div className="flex flex-col ">
          <p className="font-semibold text-md">
            {isMyProfile ? "Tu perfil" : userProfileInfo.name}
          </p>
          <p className="text-xs text-text-gray">
            {userProfileInfo._count.posts} posts
          </p>
        </div>
      </div>
      <div className="relative flex flex-col mb-6 ">
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
              src={userProfileInfo.imageUrl}
              alt="User Avatar"
              fill
              className="object-cover rounded-full"
            />
          </div>

          <ProfileActions
            isMyProfile={isMyProfile}
            currentUserIdLog={currentUserIdLog}
            userProfileInfoId={userProfileInfo.id}
          />
        </div>

        {/* Profile Info */}
        <div className="px-4 mt-2 ">
          <h1 className="text-2xl font-semibold">{userProfileInfo.name}</h1>
          <p className="text-sm text-text-gray">
            @{userProfileInfo.displayName}
          </p>

          <p className="mt-3 text-sm">Descipcion de gustos</p>

          <div className="flex gap-5 mt-1 text-text-gray text-xs">
            <div className="flex items-center gap-1">
              <MapPin size={16} className="" />
              <span>Pais</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarX size={16} className="" />
              <span >
                Se unió e{" "}
                {new Date(userProfileInfo.createdAt.toString()).toLocaleString(
                  "es-CO",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
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
