"use client";
import { getGroupsByInputAction } from "@/actions/group/getGroup";
import { Search } from "lucide-react";
import React, { useState } from "react";
import GroupCard from "../../CreateGroup/GroupCard";
import { GroupCardType } from "@/types";

const SearchGroups = () => {
  const [search, setSearch] = useState("");
  const [groups, setGroups] = useState<GroupCardType[]>([]);

  const handleSearch = async (formData: FormData) => {
    const searchResults = await getGroupsByInputAction(formData);
    setGroups(searchResults);
  };

  return (
    <div>
      <form className="" action={handleSearch}>
        <div className="relative w-[16rem] ">
          <Search
            size={19}
            strokeWidth={1}
            className="absolute text-black  top-1/2 -translate-y-1/2 left-2 "
          />
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            name="nameGroup"
            placeholder="Busca por nombre"
            className="w-full placeholder:text-black text-black outline-none border p-3 pl-10 bg-primary-color rounded-lg placeholder:font-poppins placeholder:text-sm text-sm"
          />
        </div>
      </form>
      <div className="flex gap-3 flex-col  w-full overflow-x-auto py-2">
        {groups.map((group) => (
          <div key={group.id}>
            <GroupCard group={group} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default SearchGroups;
