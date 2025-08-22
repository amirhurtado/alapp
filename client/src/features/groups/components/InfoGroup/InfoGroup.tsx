"use client";

import { FullInfoGroup, FullUserType } from "@/types";
import Image from "next/image";
import InfoMembers from "./InfoMembers";
import CreateEventButton from "./CreateEventButton";
import ToggleGroupAction from "./ToggleGroupAction";
import { useQuery } from "@tanstack/react-query";
import { useJoinMitation } from "../../hooks/useJoinMutation";

interface InfoGroupProps {
  infoGroup: FullInfoGroup;
  infoUser: FullUserType;
}

const getDate = (createdAt: Date) => {
  return new Date(createdAt.toString()).toLocaleString("es-CO", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

const InfoGroup = ({ infoGroup: initialData, infoUser }: InfoGroupProps) => {
  const queryKey = ["infoGroup", { groupId: initialData.id }];

  const { data: infoGroup } = useQuery({
    queryKey,
    queryFn: () => initialData,
    enabled: false,
    initialData: initialData,
  });

  const joinMutation = useJoinMitation();

  const infoUserForMutation = {
    displayName: infoUser.displayName,
    id: infoUser.id,
    imageUrl: infoUser.imageUrl,
    name: infoUser.name,
  };

  return (
    <div className="max-h-screen overflow-y-scroll w-full p-4 flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2 relative">
        <div className="w-[6rem] h-[6rem]  relative">
          <Image
            src={infoGroup.imageUrl}
            alt="image-group"
            fill
            className="object-cover rounded-full"
          />
        </div>
        <div className="text-center">
          <p className="text-sm">{infoGroup.name}</p>
          <p className="text-xs text-text-gray">{infoGroup.description}</p>
        </div>

        <div className="text-xs text-text-gray absolute right-0 flex flex-col items-end">
          <p className="text-icon-green">Creado el:</p>
          <p>{getDate(infoGroup.createdAt)}</p>
        </div>
      </div>

      <div className="flex justify-between w-full items-center">
        <ToggleGroupAction
          isMember={infoGroup.isMember}
          onAction={() =>
            joinMutation.mutate({ groupId: infoGroup.id, infoUser: infoUserForMutation })
          }
        />
        <CreateEventButton disabled={infoUser.id !== infoGroup.adminId} />
      </div>
      <InfoMembers members={infoGroup.members} admin={infoGroup.admin} currentuserId={infoUser.id} />
    </div>
  );
};

export default InfoGroup;
