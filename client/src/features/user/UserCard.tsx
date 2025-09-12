import React from "react";

import FollowButton from "@/features/follows/FollowButton";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import { UserCardType } from "@/types";

interface UserCardRecommendationProps {
  user: UserCardType;
  onFollow?: () => void;
  isMe?: boolean
}

const UserCard = ({ user, onFollow, isMe }: UserCardRecommendationProps) => {
  return (
    <div className="flex justify-between p-2 hover:bg-hover rounded-lg  border-1 border-border transition-colors duration-200 ease-in">
      <div className="flex gap-3 items-center">
        <Avatar src={user.imageUrl} />

        <div className="flex flex-col">
          <Link href={`/${user.name}`}>
            <p className="text-sm font-semibold cursor-pointer hover:underline">
              {user.name}
              {isMe && (
                <span className="text-[0.6rem] text-primary-color"> (Tú)</span>
              )}
            </p>
          </Link>
          <p className="text-xs text-text-gray">@{user.displayName}</p>
        </div>
      </div>

      {onFollow ? (
        <FollowButton
          isFriend={user.isFriend}
          onFollow={onFollow}
          fromProfile={false}
        />
      ) : (
        <>
        {user.isFriend && (<p className="text-primary-color text-xs flex items-center">Es tu amigo</p>)}

        </>
      )}
    </div>
  );
};

export default UserCard;
