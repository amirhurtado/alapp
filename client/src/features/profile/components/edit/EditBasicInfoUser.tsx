import React from "react";

interface EditBasicInfoUserProps {
  newBio: string;
  setNewBio: React.Dispatch<React.SetStateAction<string>>;
}

const EditBasicInfoUser = ({ newBio, setNewBio }: EditBasicInfoUserProps) => {
  return (
    <div className="flex flex-col gap-4 w-full md:w-[22rem] mt-2">
      <p className="text-text-gray text-sm">Información adicional</p>

      <div className="flex flex-col gap-2 ">
        <p className="text-xs text-text-gray">Biografía</p>
        <textarea
          className="border-input border-1 rounded-lg p-4 placeholder:font-poppins font-poppins text-sm"
          value={newBio}
          onChange={(e) => {
            setNewBio(e.target.value)
          }}
          name="bio"  
        />
      </div>
    </div>
  );
};

export default EditBasicInfoUser;
