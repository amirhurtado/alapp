"use client";
import { getGroupsRecommendationAction } from "@/actions/group/getGroup";
import GroupCard from "@/features/groups/components/CreateGroup/GroupCard";
import { GroupCardType } from "@/types";
import {  useQuery } from "@tanstack/react-query";
import React from "react";

interface PopularGroupsProps {
  groupsRecommendations: GroupCardType[];
  currentUserId: string;
}

const PopularGroups = ({
  groupsRecommendations: initialGroupsRecommendations,
  currentUserId,
}: PopularGroupsProps) => {
  const queryKey = ["groupRecommendations", { site: "rightbar" }];
  const { data } = useQuery({
    queryKey,
    queryFn: () => {
      return getGroupsRecommendationAction(currentUserId);
    },

    initialData: initialGroupsRecommendations,
  });

  return (
    <div className="border-1 border-border rounded-xl p-4 flex flex-col gap-4">
      <p className="text-md font-bold">Puedes unirte a grupos</p>

      <div className="flex flex-col gap-3">
        {data.map((group, index) => (
          <div key={index}>
            <GroupCard group={group} wfull={true} />
          </div>
        ))}
        <div className="flex justify-between items-center">
          <p className="text-text-gray text-xs">
            Crea o haz parte de{" "}
            <span className="text-primary-color font-bold">eventos.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopularGroups;
