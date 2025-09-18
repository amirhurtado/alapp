import React from "react";


import ProfileActions from "@/features/user/profile/components/ProfileActions";
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

        <HeroProfile imgurl={userProfileInfo.imageUrl}  bg={userProfileInfo.profile?.bg ?? ""}/>

        <ProfileActions
          currentUserId={currentUserId}
          userProfileInfo={{id: userProfileInfo.id, username: userProfileInfo.name}}
        />

        {/* Profile Info */}
        <UserInfo  userProfileInfo={userProfileInfo} currentUserId={currentUserId} />
       
      </div>
    </>
  );
};

export default HeaderProfiler;
