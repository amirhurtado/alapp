import { FullInfoGroup } from "@/types";
import Image from "next/image";
import InfoMembers from "./InfoMembers";
import CreateEventButton from "./CreateEventButton";

interface InfoGroupProps {
  infoGroup: FullInfoGroup;
  currentUserId: string
}

const getDate = (createdAt: Date) => {
  return new Date(createdAt.toString()).toLocaleString("es-CO", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

const InfoGroup = ({ infoGroup, currentUserId }: InfoGroupProps) => {
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

      <div className="relative">
        <InfoMembers members={infoGroup.members} admin={infoGroup.admin} />

        <div className="absolute right-0 top-0">
          <CreateEventButton disabled={currentUserId !== infoGroup.adminId} />
        </div>
      </div>
    </div>
  );
};

export default InfoGroup;
