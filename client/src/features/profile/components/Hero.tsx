import React from "react";

import Image from "next/image";


const HeroProfile = ({ imgurl }: { imgurl: string }) => {
  console.log("LA IMAGE URL DEL PERFIL ESS",imgurl)

  return (
    <div className="flex relative">
      <div className="relative w-full h-[120px] md:h-[200px] border-y-1 border-border">
        <Image
          src={"/base-image-profile.webp"}
          alt="Profile Background"
          fill
          className=" object-cover"
        />
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
