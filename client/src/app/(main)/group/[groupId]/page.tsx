import { getGroupInfoAction } from "@/actions/group/getGroup";
import BackNavigation from "@/components/ui/BackNavigation";
import InfoGroup from "@/features/groups/components/InfoGroup/InfoGroup";
import React from "react";

type Props = {
  params: {
    groupId: string;
  };
};

const page = async ({ params }: Props) => {
  const [{ groupId }] = await Promise.all([params]);

  const infoGroup = await getGroupInfoAction(parseInt(groupId, 10));
  console.log(infoGroup);

  if(!infoGroup) return 

  return (
    <div className="h-screen flex flex-col overflow-hidden gap-6">
      <BackNavigation title={`Grupo - ${infoGroup?.name}`} />
      <InfoGroup infoGroup={infoGroup}/>
    </div>
  );
};

export default page;
