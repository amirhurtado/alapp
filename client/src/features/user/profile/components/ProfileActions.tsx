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
  userProfileInfoId: string;
}

const ProfileActions = ({
  currentUserId,
  userProfileInfoId,
}: ProfileActionsProps) => {
  const queryKey = ["isFriend", userProfileInfoId];
  const isMyProfile = currentUserId === userProfileInfoId;

  const { data: isFriend } = useQuery({
    queryKey,
    queryFn: () => isFriendAction(currentUserId, userProfileInfoId),
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

          <div className="absolute bottom-[-1.6rem] right-0">
          <SettingsProfileButton />


          </div>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <button
            aria-label="Enviar mensaje"
            className="border-1 border-border rounded-full w-10 h-10 flex items-center justify-center"
          >
            <MessageSquare size={20} className="" />
          </button>
          <FollowButton
            isFriend={isFriend ?? false}
            onFollow={() =>
              followMutation.mutate({
                currentUserId,
                userProfileId: userProfileInfoId,
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
