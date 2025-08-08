"use client";

import { toggleFollowAction } from "@/actions/user";
import { Trash, UserRoundCheck } from "lucide-react";

interface FollowButtonProps {
  isFriend: boolean;
  currentUserId: string;
  otherUserId: string;
}

const FollowButton = ({
  isFriend,
  currentUserId,
  otherUserId,
}: FollowButtonProps) => {
  const handleFollowClick = async () => {
    await toggleFollowAction(isFriend, currentUserId, otherUserId);
  };
  return (
    <>
      {isFriend ? (
        <div className="flex gap-2">
          <div className="border-1 border-border rounded-full w-8 h-8 flex items-center justify-center bg-primary-color">
            <UserRoundCheck size={20} className="ml-1" />
          </div>

          <button
            onClick={handleFollowClick}
            className="flex gap-2 cursor-pointer  bg-red-500 items-center justify-center rounded-lg px-2 py-1 active:scale-[0.95] hover:bg-red-400 transition-all duration-200 ease-in"
          >
            <Trash size={20} />
            <p className="text-xs">Dejar de seguir</p>
          </button>
        </div>
      ) : (
        <div className="text-black hover:text-white px-3 rounded-lg h-8 flex items-center cursor-pointer bg-primary-color active:scale-[0.95] transition-all duration-200 ease-in">
          <button
            onClick={handleFollowClick}
            aria-label="Seguir"
            className="text-sm  cursor-pointer "
          >
            Seguir
          </button>
        </div>
      )}
    </>
  );
};

export default FollowButton;
