import { GroupCardType } from "@/types";
import GroupsAsAdmin from "./GroupsAsAdmin";
import GroupsRecommendations from "./SearchGroup/GroupsRecommendations";
import GroupAsMember from "./GroupAsMember";
import SearchGroups from "./SearchGroup/SearchGroups";

interface ExploreGroupsProps {
  currentUserId: string;
  groupsAsAdmin: GroupCardType[];
  groupsAsMember: GroupCardType[];
  groupRecommendations: GroupCardType[];
}

const ExploreGroups = ({
  currentUserId,
  groupsAsAdmin,
  groupsAsMember,
  groupRecommendations,
}: ExploreGroupsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <GroupsAsAdmin groupsAsAdmin={groupsAsAdmin} />
      <GroupAsMember groupsAsMember={groupsAsMember} />

      <div className="w-full border-y-1 border-border py-4 flex flex-col gap-2">
        <p className="text-sm text-text-gray">Explorar grupos</p>

        <GroupsRecommendations
          currentUserId={currentUserId}
          groupRecommendations={groupRecommendations}
        />

        <SearchGroups/>
      </div>
    </div>
  );
};

export default ExploreGroups;
