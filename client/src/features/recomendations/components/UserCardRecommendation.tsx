import React from "react";

import FollowButton from "@/features/profile/components/FollowButton";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";

interface UserCardRecommendationProps {
  user: {
    id: string;
  name: string;
  displayName: string;
  imageUrl: string;
  isFriend: boolean
  }
  onFollow: () => void
}

const UserCardRecommendation = ({user, onFollow} : UserCardRecommendationProps) => {

  
  return (
    <div
      className="flex justify-between p-2 hover:bg-hover rounded-lg  border-1 border-border transition-colors duration-200 ease-in"
    >
      <div className="flex gap-3 items-center">
        <Avatar src={user.imageUrl} />

        <div className="flex flex-col">
          <Link href={`/${user.name}`}>
            <p className="text-sm font-semibold cursor-pointer hover:underline">
              {user.name}
            </p>
          </Link>
          <p className="text-xs text-text-gray">@{user.displayName}</p>
        </div>
      </div>
      <FollowButton
        isFriend={user.isFriend}
        onFollow={onFollow}
        fromProfile={false}
      />
    </div>
  );
};

export default UserCardRecommendation;
