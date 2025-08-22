import { getGroupInfoAction } from "@/actions/group/getGroup";
import BackNavigation from "@/components/ui/BackNavigation";
import InfoGroup from "@/features/groups/components/InfoGroup/InfoGroup";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

type Props = {
  params: {
    groupId: string;
  };
};

const page = async ({ params }: Props) => {
  const [{ groupId }, currUser] = await Promise.all([params, currentUser()]);

  if (!currUser) return;

  const infoGroup = await getGroupInfoAction(
    parseInt(groupId, 10),
    currUser.id
  );

  if (!infoGroup) return;

  return (
    <div className="h-screen flex flex-col overflow-hidden gap-6">
      <BackNavigation title={`Grupo - ${infoGroup?.name}`} />
      <InfoGroup infoGroup={infoGroup} currentUserId={currUser.id} />
    </div>
  );
};

export default page;
