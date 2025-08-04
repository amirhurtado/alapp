import { Lock } from "lucide-react";

interface NonEditableInputProps{
    label: string;
    value: string
}


const NonEditableInput = ({label, value}: NonEditableInputProps) => {
  return (
    <div className="flex flex-col gap-2 w-full md:w-[22rem] relative ">
          <label className="text-xs text-text-gray" htmlFor="">{label}</label>
          <input type="text" value={value} readOnly className="w-full cursor-not-allowed border-b rounded-lg bg-input py-2 px-3 font-poppins text-sm text-text-gray" /> 
          <Lock strokeWidth={1} size={20} className="absolute right-2 top-1/2 text-icon-green"  />
        </div>
  )
}

export default NonEditableInput
