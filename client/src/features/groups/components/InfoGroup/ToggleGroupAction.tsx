import React from "react";

interface ToggleGroupActionprops {
  isMember: boolean;
  onJoinAction : () => void
}

const ToggleGroupAction = ({ isMember, onJoinAction }: ToggleGroupActionprops) => {
  return (
    <div >
      {isMember ? (
        <div className=" hover:text-white px-3 rounded-lg h-8 flex items-center cursor-pointer bg-red-400 active:scale-[0.95] transition-all duration-200 ease-in">
          <button onClick={onJoinAction} aria-label="Abandonar" className="text-sm  cursor-pointer ">
            Abandonar
          </button>
        </div>
      ) : (
        
        <div className="flex flex-col gap-2 items-end">
          <div className="text-black hover:text-white px-3 rounded-lg h-8 flex items-center cursor-pointer bg-primary-color active:scale-[0.95] transition-all duration-200 ease-in">
          <button onClick={onJoinAction} aria-label="Unirte" className="text-sm  cursor-pointer ">
            Unirte
          </button>
        </div>
          <p className="text-xs text-text-gray">Únete para recibir notificaciones.</p>

        </div>
        
      )}
    </div>
  );
};

export default ToggleGroupAction;
