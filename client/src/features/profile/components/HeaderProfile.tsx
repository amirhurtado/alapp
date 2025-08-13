import React from "react";


import ProfileActions from "@/features/profile/components/ProfileActions";
import { FullUserType } from "@/types";
import HeroProfile from "./Hero";
import UserInfo from "./UserInfo";

interface HeaderProfilerProps {
  userProfileInfo: FullUserType
  currentUserId: string;
}

const HeaderProfiler = ({
  userProfileInfo,
  currentUserId,
}: HeaderProfilerProps) => {


  return (
    <>
      <div className="relative flex flex-col mb-6 ">
        {/* Profile Header */}

        <HeroProfile imgurl={userProfileInfo.imageUrl} />

        <ProfileActions
          currentUserId={currentUserId}
          userProfileInfoId={userProfileInfo.id}
        />

        {/* Profile Info */}
        <UserInfo  userProfileInfo={userProfileInfo} currentUserId={currentUserId} />
       
      </div>
    </>
  );
};

export default HeaderProfiler;
