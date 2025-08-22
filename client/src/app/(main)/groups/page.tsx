import {
  getGroupsAsAdminAction,
  getGroupsRecommendationAction,
} from "@/actions/group/getGroup";
import BackNavigation from "@/components/ui/BackNavigation";
import FullGroupView from "@/features/groups/components/FullGroupView";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
  const [currUser] = await Promise.all([currentUser()]);

  if (!currUser) return;

  const [groupsAsAdmin, groupRecommendations] = await Promise.all([
    getGroupsAsAdminAction(currUser.id),
    getGroupsRecommendationAction(currUser.id),
  ]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <BackNavigation title="Grupos" />
      <FullGroupView
        currentUserId={currUser.id}
        groupsAsAdmin={groupsAsAdmin}
        groupRecommendations={groupRecommendations}
      />
    </div>
  );
};

export default page;
