import { Image } from "@imagekit/next";
import { Ellipsis } from "lucide-react";
import React from "react";

const PopularTags = () => {
  return (
    <div className="border-1 border-border rounded-xl p-4 flex flex-col gap-4">
      <p className="text-md font-bold">¿Qué está pasando?</p>

      <div className="flex flex-col gap-3">
        <div className="flex gap-4">
          <div className="w-18 h-18 relative overflow-hidden rounded-lg">
            <Image
              src="/default-image.jpg"
              alt="default"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-[.9rem] font-semibold">
              Nadal y federer Grand Slam
            </p>
            <p className="text-xs text-text-gray">Anoche</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
            <p className="text-sm">Trending en España</p>
            <Ellipsis size={20} className='text-text-gray' />

        </div>
      </div>
    </div>
  );
};

export default PopularTags;
