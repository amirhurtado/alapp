import React from "react";

import Image from "next/image";


const HeroProfile = ({ imgurl }: { imgurl: string }) => {

  return (
    <div className="flex relative">
      <div className="relative w-full h-[120px] md:h-[200px] border-y-1 border-border bg-gradient-to-r from-blue-500 to-purple-500">
      </div>
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
