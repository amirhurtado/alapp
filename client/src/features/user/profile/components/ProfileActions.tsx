"use client";

import { MessageSquare, SquarePen } from "lucide-react";
import SettingsProfileButton from "./edit/SettingsProfileButton";
import FollowButton from "../../../follows/FollowButton";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { isFriendAction } from "@/actions/follow/follow";
import { useFollowMutation } from "../hooks/useFollowMutation";

interface ProfileActionsProps {
  currentUserId: string;
  userProfileInfo: {
    id: string,
    username: string
  }
}

const ProfileActions = ({
  currentUserId,
  userProfileInfo,
}: ProfileActionsProps) => {
  const queryKey = ["isFriend", userProfileInfo.id];
  const isMyProfile = currentUserId === userProfileInfo.id;

  const { data: isFriend } = useQuery({
    queryKey,
    queryFn: () => isFriendAction(currentUserId, userProfileInfo.id),
    enabled: !isMyProfile,
  });

  const followMutation = useFollowMutation();

  return (
    <div className="flex justify-end px-3 pt-4">
      {isMyProfile ? (
        <div className="relative ">
          <Link
            href={`/edit-profile`}
            className="flex gap-2 cursor-pointer  border-1 border-border items-center justify-center rounded-lg px-2 py-2 active:scale-[0.95] hover:bg-primary-color transition-all duration-200 ease-in"
          >
            <SquarePen size={20} strokeWidth={1} />
            <p className="text-xs">Editar perfil</p>
          </Link>

          <div className="absolute bottom-[-1.9rem] right-0">
          <SettingsProfileButton />


          </div>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <Link href={`/messages/chat/${userProfileInfo.username}`}
            className="border-1 border-border rounded-full w-10 h-10 flex items-center justify-center"
          >
            <MessageSquare size={20} className="" />
          </Link>
          <FollowButton
            isFriend={isFriend ?? false}
            onFollow={() =>
              followMutation.mutate({
                currentUserId,
                userProfileId: userProfileInfo.id,
              })
            }
            fromProfile={true}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileActions;
