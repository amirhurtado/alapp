import { Mail, Lock, User } from "lucide-react";

interface NonEditableInputProps {
  label: string;
  value: string;
}

const NonEditableInput = ({ label, value }: NonEditableInputProps) => {
  return (
    <div className="flex flex-col gap-2 w-full md:w-[22rem]  ">
      <label className="text-xs text-text-gray" htmlFor="">
        {label}
      </label>

      <div className="relative w-full">
        <div className="absolute left-2 top-1/2 -translate-y-[50%] text-text-gray">
          {label.toLowerCase() === "email" ? (
            <Mail strokeWidth={1} size={20} />
          ) : (
            <User strokeWidth={1} size={20} />
          )}
        </div>

        <input
          type="text"
          value={value}
          readOnly
          className="w-full cursor-not-allowed border-b rounded-lg bg-input py-2 pr-3 pl-10 font-poppins text-sm text-text-gray"
        />
        <Lock
          strokeWidth={1}
          size={20}
          className="absolute right-2 top-1/2 -translate-y-[50%] text-icon-green"
        />
      </div>
    </div>
  );
};

export default NonEditableInput;
