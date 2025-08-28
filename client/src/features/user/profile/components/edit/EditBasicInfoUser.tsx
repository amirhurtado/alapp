import React from "react";
import ReactFlagsSelect from "react-flags-select";

interface EditBasicInfoUserProps {
  newBio: string;
  setNewBio: React.Dispatch<React.SetStateAction<string>>;
  selectedCountry: string;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
}

const EditBasicInfoUser = ({
  newBio,
  setNewBio,
  selectedCountry,
  setSelectedCountry,
}: EditBasicInfoUserProps) => {
  return (
    <div className="flex flex-col gap-4 w-full md:w-[22rem] mt-2">
      <p className="text-text-gray text-sm">Información adicional</p>

      <div className="flex flex-col gap-2">
        <p className="text-xs text-text-gray">Ubicación</p>
        <input type="hidden" name="country" value={selectedCountry} />
        <ReactFlagsSelect
          selected={selectedCountry}
          onSelect={(code) => setSelectedCountry(code)}
          placeholder="Selecciona tu país"
          searchable
          searchPlaceholder="Buscar país..."
          className="flags-select-dark-theme"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs text-text-gray">Biografía</p>
        <textarea
          className="border-input border-1 rounded-lg p-4 placeholder:font-poppins font-poppins text-sm"
          value={newBio}
          onChange={(e) => {
            setNewBio(e.target.value);
          }}
          name="bio"
        />
      </div>
    </div>
  );
};

export default EditBasicInfoUser;
