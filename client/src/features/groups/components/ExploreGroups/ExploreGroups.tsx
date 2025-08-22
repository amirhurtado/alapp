
import { GroupCardType } from "@/types";
import GroupsAsAdmin from "./GroupsAsAdmin";
import SearchGroups from "./SearchGroups";
import GroupAsMember from "./GroupAsMember";


interface ExploreGroupsProps {
  currentUserId: string
   groupsAsAdmin: GroupCardType[] 
   groupRecommendations: GroupCardType[] 
}

const ExploreGroups = ({ currentUserId ,groupsAsAdmin, groupRecommendations }: ExploreGroupsProps) => {
  return (
    <div className="flex flex-col gap-4">

      <GroupsAsAdmin groupsAsAdmin={groupsAsAdmin} />
      <GroupAsMember />
      <SearchGroups currentUserId={currentUserId} groupRecommendations={groupRecommendations} />
    </div>
  );
};

export default ExploreGroups;
