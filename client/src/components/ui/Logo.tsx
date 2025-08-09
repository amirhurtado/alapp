import React from 'react'
import Image from "next/image";

const Logo = () => {
  return (
    <div className="w-full flex justify-center">
        <div className="flex justify-center items-center relative  w-[4rem] h-[4rem] md:w-[20rem] md:h-[20rem]">
          <Image src="/logo.svg" alt="Logo" fill className="" />
        </div>
      </div>
  )
}

export default Logo
