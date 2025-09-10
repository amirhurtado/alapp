import React from "react";
import Image from "next/image";

const gradients = [
  { id: "blue-purple", class: "bg-gradient-to-r from-blue-500 to-purple-500" },
  { id: "pink-orange", class: "bg-gradient-to-r from-pink-500 to-orange-500" },
  { id: "green-blue", class: "bg-gradient-to-r from-green-400 to-blue-500" },
  { id: "yellow-orange-red", class: "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500" },
  { id: "cyan-blue", class: "bg-gradient-to-r from-cyan-500 to-blue-500" },
];

const HeroProfile = ({ imgurl, bg }: { imgurl: string; bg: string }) => {
  const gradientClass =
    gradients.find((g) => g.id === bg)?.class ||
    "bg-gradient-to-r from-blue-500 to-purple-500"; 

  return (
    <div className="flex relative">
      <div
        className={`relative w-full h-[120px] md:h-[200px] border-y-1 border-border ${gradientClass}`}
      ></div>

      <div className="absolute top-1/2 translate-y-1/2 left-4 w-[4.5rem] h-[4.5rem] md:w-[6rem] md:h-[6rem]">
        <Image
          src={imgurl}
          alt="User Avatar"
          fill
          priority
          className="object-cover rounded-full"
        />
      </div>
    </div>
  );
};

export default HeroProfile;
