import { getGroupInfoAction } from "@/actions/group/getGroup";
import { getUserbyNameAction } from "@/actions/user/getUser";
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

  const [infoGroup, infoUser] = await Promise.all([
    getGroupInfoAction(parseInt(groupId, 10), currUser.id),

    getUserbyNameAction(currUser.username!)
  ]);

  if (!infoGroup || !infoUser) return;


  return (
    <div className="h-screen flex flex-col overflow-hidden gap-6">
      <BackNavigation title={`Grupo - ${infoGroup?.name}`} />
      <InfoGroup infoGroup={infoGroup} infoUser={infoUser} />
    </div>
  );
};

export default page;
