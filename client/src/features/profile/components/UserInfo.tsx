"use client";

import { CalendarX, MapPin } from "lucide-react";
import FollowStats from "./FollowStats";
import { FullUserType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getFollowsActions } from "@/actions/user";

interface UserInfoProps {
  userProfileInfo: FullUserType;
  currentUserId: string
}

const UserInfo = ({ userProfileInfo, currentUserId }: UserInfoProps) => {
  const queryKey = ["InfoFollowUser", userProfileInfo.id];

  const { data: follows } = useQuery({
    queryKey,
    queryFn: () => {

      return getFollowsActions(userProfileInfo.id, currentUserId)

    }
  });


  const getDate = (createdAt: Date) => {
    return new Date(createdAt.toString()).toLocaleString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="px-4 mt-2 ">
      <h1 className="text-2xl font-semibold">{userProfileInfo.name}</h1>
      <p className="text-sm text-text-gray">@{userProfileInfo.displayName}</p>

      <p className="mt-3 text-xs text-text-gray">
        {userProfileInfo.profile?.bio}
      </p>

      <div className="flex gap-5 mt-4 text-text-gray text-xs ">
        <div className="flex items-center gap-1">
          <MapPin size={16} className="" />
          <span>Pais</span>
        </div>
        <div className="flex items-center gap-1">
          <CalendarX size={16} className="" />
          <span>Se unió el {getDate(userProfileInfo.createdAt)}</span>
        </div>
      </div>

      <FollowStats
        followings={follows?.following ?? 0}
        followers={follows?.followers ?? 0}
      />
    </div>
  );
};

export default UserInfo;
