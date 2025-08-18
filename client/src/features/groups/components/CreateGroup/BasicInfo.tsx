import { ScanFace } from "lucide-react";
import React from "react";

interface BasicInfoGroupProps{
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    description: string
    setDescription: React.Dispatch<React.SetStateAction<string>>
}


const BasicInfoGroup = ({name, setName, description, setDescription } : BasicInfoGroupProps) => {
  return (

    <div className="flex flex-col gap-5 w-full md:w-[22rem] ">


         <div className="flex flex-col w-full md:w-[22rem] gap-2">
        <label className="text-xs text-text-gray" htmlFor="alias">
          Nombre
        </label>

        <div className="relative">
          <input
            id="alias"
            type="text"
            name="name"
            value={`${name}`}
            placeholder={"Nombre del grupo"}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="w-full  border-b rounded-lg bg-input py-2 pr-3 pl-10 font-poppins text-sm text-text-gray"
          />
          <ScanFace
            strokeWidth={1}
            size={20}
            className="absolute left-2 top-1/2 -translate-y-[50%] text-text-gray"
          />
        </div>
      </div>

       <div className="flex flex-col gap-2 ">
        <p className="text-xs text-text-gray">Descripción</p>
        <textarea
          className="border-input border-1 rounded-lg p-4 placeholder:font-poppins font-poppins text-sm"
          value={description}
          placeholder="Descripción del grupo"
          onChange={(e) => {
            setDescription(e.target.value)
          }}
          name="description"  
        />
      </div>

    </div>
    
  )
}

export default BasicInfoGroup
