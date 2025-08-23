"use server"

import React from "react";
import PopularGroups from "@/features/popular/components/PopularGroups";
import Recomendations from "@/features/recomendations/components/Recommendations";
import { getGroupsRecommendationAction } from "@/actions/group/getGroup";

const RightBar = async ({currentUserId}: {currentUserId: string}) => {

  const [groupsRecommendations] = await Promise.all([
    getGroupsRecommendationAction(currentUserId)
  ])

  return (
    <div className="flex flex-col justify-between gap-4 h-screen py-10">
      <div className="flex flex-col gap-4">
        <PopularGroups groupsRecommendations={groupsRecommendations} currentUserId={currentUserId}/>
        <Recomendations currentUserId={currentUserId} placement={"rightbar"} />
      </div>

      <div className="flex flex-wrap gap-4 text-text-gray text-xs">
        <p>Accesibilidad</p>
        <p>Politicas</p>
        <p>&copy; Amir Hurtado -Santiago Rudas - Santiago Ramirez 2025 </p>
      </div>
    </div>
  );
};

export default RightBar;
