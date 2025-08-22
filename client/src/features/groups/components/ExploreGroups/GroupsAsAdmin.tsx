import React, { useState } from "react";
import GroupCard from "../CreateGroup/GroupCard";
import { GroupCardType } from "@/types";
import { Search } from "lucide-react";

interface ExploreGroupsProps {
  groupsAsAdmin: GroupCardType[];
}

const GroupsAsAdmin = ({ groupsAsAdmin }: ExploreGroupsProps) => {
  const [filter, setFilter] = useState("");

  const filteredGroups = groupsAsAdmin.filter((group) => {
    return group.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <>
      {groupsAsAdmin.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-text-gray ">Grupos que creaste</p>

          <>
            <div className="relative w-[16rem] ">
              <Search
                size={19}
                strokeWidth={1}
                className="absolute  top-1/2 -translate-y-1/2 left-2 "
              />
              <input
                onChange={(e) => setFilter(e.target.value)}
                type="text"
                placeholder="Busca por nombre"
                className="w-full outline-none border p-3 pl-10 bg-input rounded-lg placeholder:font-poppins placeholder:text-sm text-sm"
              />
            </div>

            <div className="flex gap-2  w-full overflow-x-auto py-2">
              {filteredGroups.map((group) => (
                <div key={group.id}>
                  <GroupCard group={group} />
                </div>
              ))}
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default GroupsAsAdmin;
