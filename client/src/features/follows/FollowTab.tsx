import Link from "next/link";
import React from "react";

interface FollowTabProps {
  type: "followings" | "followers";
  usernameProfile: string;
}

const FollowTab = ({ type, usernameProfile }: FollowTabProps) => {
  const classActive = "border-b-3 border-primary-color";
  const classInactive =
    "border-b-3 border-transparent text-text-gray hover:text-white transition-colors duration-200 ease-in";
  
  const baseClasses = "w-full text-center pb-2 mb-3";

  return (
    <div className="flex w-full justify-between items-end font-sans text-[.9rem] pt-[1rem] font-semibold">
      {type === "followings" ? (
        <div className={`${baseClasses} ${classActive}`}>
          <p>Siguiendo</p>
        </div>
      ) : (
        <Link
          href={`/${usernameProfile}/follows?query=followings`}
          className={`${baseClasses} ${classInactive}`}
        >
          <p>Siguiendo</p>
        </Link>
      )}

      {type === "followers" ? (
        <div className={`${baseClasses} ${classActive}`}>
          <p>Seguidores</p>
        </div>
      ) : (
        <Link
          href={`/${usernameProfile}/follows?query=followers`}
          className={`${baseClasses} ${classInactive}`}
        >
          <p>Seguidores</p>
        </Link>
      )}
    </div>
  );
};

export default FollowTab;