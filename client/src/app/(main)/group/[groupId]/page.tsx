import { getEventsAction } from "@/actions/event/getEvent";
import { getGroupInfoAction } from "@/actions/group/getGroup";
import { getUserbyNameAction } from "@/actions/user/getUser";
import BackNavigation from "@/components/ui/BackNavigation";
import InfoGroup from "@/features/groups/components/InfoGroup/InfoGroup";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    groupId: string;
  };
};

const page = async ({ params }: Props) => {
  const [{ groupId }, currUser] = await Promise.all([params, currentUser()]);

  if (!currUser) return;

  const [infoGroup, infoUser, events] = await Promise.all([
    getGroupInfoAction(parseInt(groupId, 10), currUser.id),
    getUserbyNameAction(currUser.username!),
    getEventsAction(parseInt(groupId, 10))
  ]);

  if (!infoGroup || !infoUser) return  notFound()


  return (
    <div className="h-screen flex flex-col overflow-hidden gap-6">
      <BackNavigation title={`Grupo - ${infoGroup?.name}`} />
      <InfoGroup infoGroup={infoGroup} infoUser={infoUser} events={events}/>
    </div>
  );
};

export default page;
