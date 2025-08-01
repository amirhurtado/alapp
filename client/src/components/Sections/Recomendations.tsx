import { getRecomentations } from "@/actions/user";
import { Image } from "@imagekit/next";
import React from "react";


const Recomendations = async ({currenUserId} : {currenUserId : string}) => {

  const recomendations = await getRecomentations(currenUserId);


  return (
    <div className="flex flex-col gap-4 border-1 border-border rounded-xl p-4">
      <p className="text-md font-bold">Recomendaciones para ti</p>
      <div className="flex flex-col gap-2">
        {recomendations && recomendations.map((user, index) => (
          <div
            key={index}
            className="flex justify-between p-2 hover:bg-hover rounded-lg transition-colors duration-200 ease-in"
          >
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 relative overflow-hidden rounded-full">
                <Image src={user.imageUrl || '/user-default'} alt="User Avatar" fill />
              </div>

              <div className="flex flex-col">
                <p className="text-sm font-semibold cursor-pointer hover:underline">
                  {user.name}
                </p>
                <p className="text-xs text-text-gray">@{user.displayName}</p>
              </div>
            </div>

            <div className="text-black bg-white px-3 rounded-lg h-8 flex items-center cursor-pointer">
              <button aria-label="Seguir" className="text-sm  cursor-pointer ">Seguir</button>
            </div>
          </div>
        ))}
      </div>
      <p className="text-icon-blue text-sm cursor-pointer">Ver más</p>
    </div>
  );
};

export default Recomendations;
