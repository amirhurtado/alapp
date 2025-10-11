"use client";

import { useState } from "react";
import GroupTab from "./GroupTab";
import CreateGroup from "./CreateGroup/CreateGroup";
import { GroupCardType } from "@/types";
import ExploreGroups from "./ExploreGroups/ExploreGroups";

interface FullGroupViewProps {
  currentUserId: string;
  groupsAsAdmin: GroupCardType[];
  groupsAsMember: GroupCardType[];
  groupRecommendations: GroupCardType[];
}

const FullGroupView = ({
  currentUserId,
  groupsAsAdmin,
  groupsAsMember,
  groupRecommendations,
}: FullGroupViewProps) => {
  const [selectSection, setSelectSection] = useState<
    "createGroup" | "exploreGroups"
  >("exploreGroups");
  return (
    <div className="flex flex-col max-h-[100dvh] gap-8 p-4 overflow-y-auto">
      <GroupTab
        selectSection={selectSection}
        setSelectSection={setSelectSection}
      />
      {selectSection === "exploreGroups" && (
        <ExploreGroups
          currentUserId={currentUserId}
          groupsAsAdmin={groupsAsAdmin}
          groupsAsMember={groupsAsMember}
          groupRecommendations={groupRecommendations}
        />
      )}
      {selectSection === "createGroup" && (
        <CreateGroup
          currentUserId={currentUserId}
          setSelectSection={setSelectSection}
        />
      )}
    </div>
  );
};

export default FullGroupView;
