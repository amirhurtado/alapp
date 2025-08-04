"use client";

import { AtSign } from "lucide-react";
import NonEditableInput from "./NonEditableInput";
import { useState } from "react";

interface EditInfoUserProps {
  basicInfoUserCurrent: {
    name: string;
    displayName: string;
    email: string;
  };
}

const EditInfoUser = ({ basicInfoUserCurrent }: EditInfoUserProps) => {

  const [newDisplayName, setNewDisplayName] = useState(basicInfoUserCurrent.displayName)



  return (
    <div className="flex flex-col gap-6">
      <NonEditableInput label="Email" value={basicInfoUserCurrent.email} />
      <NonEditableInput label="Username" value={basicInfoUserCurrent.name} />

      <div className="flex flex-col w-full md:w-[22rem] gap-2">
        <label className="text-xs text-text-gray" htmlFor="alias">
          Editar alias
        </label>

        <div className="relative">
          <input
            id="alias"
            type="text"
            value={`${newDisplayName}`}
            placeholder={basicInfoUserCurrent.displayName}
            onChange={(e) => {setNewDisplayName(e.target.value)}}
            className="w-full  border-b rounded-lg bg-input py-2 pr-3 pl-10 font-poppins text-sm text-text-gray"
          />
          <AtSign
            strokeWidth={1}
            size={20}
            className="absolute left-2 top-1/2 -translate-y-[50%] text-text-gray"
          />
        </div>
      </div>
    </div>
  );
};

export default EditInfoUser;
