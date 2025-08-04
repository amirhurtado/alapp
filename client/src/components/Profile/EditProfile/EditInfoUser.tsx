"use client";

import NonEditableInput from "./NonEditableInput";

interface EditInfoUserProps {
  basicInfoUserCurrent: {
    name: string;
    displayName: string;
    email: string;
  };
}

const EditInfoUser = ({ basicInfoUserCurrent }: EditInfoUserProps) => {
  return (
    <div className="flex flex-col gap-6">
      <NonEditableInput label="Email" value={basicInfoUserCurrent.email} />
      <NonEditableInput label="Username" value={basicInfoUserCurrent.name} />

      <div className="flex flex-col">
        <label className="text-xs text-text-gray" htmlFor="">
          Editar alias
        </label>
      </div>
    </div>
  );
};

export default EditInfoUser;
