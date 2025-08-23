import React from "react";
import Image from "next/image";
import { GroupCardType } from "@/types";
import Link from "next/link";

interface GroupCardProps {
  group: GroupCardType;
  wfull?: boolean;
}

const GroupCard = ({ group, wfull = false }: GroupCardProps) => {
  return (
    <div
      className={`flex flex-col border-border border-1 rounded-lg p-2 min-w-max ${
        wfull ? "w-full" : "max-w-max"
      } `}
    >
      <div className="flex gap-2 justify-between">
        <div className="flex gap-2">
          <div className="h-[3.5rem] w-[3.5rem]   relative ">
            <Image
              src={group.imageUrl}
              alt="image group"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="flex flex-col justify-between gap-2">
            <p className="text-sm">{group.name}</p>

            <div>
              <p className="text-xs text-text-gray">
                Por: <span className="t"> {group.admin.name}</span>{" "}
              </p>
              <p className="text-xs text-icon-green">
                {group._count.members} Miembro
                {group._count.members !== 1 && "s"}
              </p>
            </div>
          </div>
        </div>

        <Link href={`/group/${group.id}`} className="flex items-end ">
          <p className="text-xs ml-5 text-primary-color">Ver más</p>
        </Link>
      </div>
    </div>
  );
};

export default GroupCard;
