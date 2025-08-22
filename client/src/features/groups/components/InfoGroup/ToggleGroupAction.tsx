import React from "react";

interface ToggleGroupActionprops {
  isMember: boolean;
  onAction : () => void
}

const ToggleGroupAction = ({ isMember, onAction }: ToggleGroupActionprops) => {
  return (
    <div>
      {isMember ? (
        <div className=" hover:text-white px-3 rounded-lg h-8 flex items-center cursor-pointer bg-red-400 active:scale-[0.95] transition-all duration-200 ease-in">
          <button onClick={onAction} aria-label="Unirte" className="text-sm  cursor-pointer ">
            Abandonar
          </button>
        </div>
      ) : (
        <div className="text-black hover:text-white px-3 rounded-lg h-8 flex items-center cursor-pointer bg-primary-color active:scale-[0.95] transition-all duration-200 ease-in">
          <button onClick={onAction} aria-label="Unirte" className="text-sm  cursor-pointer ">
            Unirte
          </button>
        </div>
      )}
    </div>
  );
};

export default ToggleGroupAction;
