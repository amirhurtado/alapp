
import { GroupCardType } from "@/types";
import GroupsAsAdmin from "./GroupsAsAdmin";


interface ExploreGroupsProps {
   groupsAsAdmin: GroupCardType[] 
}

const ExploreGroups = ({ groupsAsAdmin }: ExploreGroupsProps) => {
  return (
    <div className="flex flex-col">
      <GroupsAsAdmin groupsAsAdmin={groupsAsAdmin} />
      
    </div>
  );
};

export default ExploreGroups;
