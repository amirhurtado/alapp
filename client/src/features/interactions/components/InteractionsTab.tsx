import React from "react";

interface TabInteractionsProps {
  selectInteraction: "likes" | "reposts" | "favorites";
  setSelectInteraction: React.Dispatch<
    React.SetStateAction<
      "likes"| "reposts" | "favorites"
    >
  >;
}

const TabInteractions = ({
  selectInteraction,
  setSelectInteraction,
}: TabInteractionsProps) => {
  const classActive =
    "border-b-3 border-primary-color text-white font-semibold";
  const classInactive =
    "border-b-3 border-transparent text-text-gray  hover:text-white transition-colors duration-200 ease-in cursor-pointer";

  return (
    <div className="flex justify-between items-end font-sans text-[.9rem] pt-4 font-semibold">
      <button
        onClick={() => setSelectInteraction("likes")}
        className={`w-full text-center pb-2 ${
          selectInteraction === "likes" ? classActive : classInactive
        }`}
      >
        Likes
      </button>

      <button
        onClick={() => setSelectInteraction("reposts")}
        className={`w-full text-center pb-2 ${
          selectInteraction === "reposts" ? classActive : classInactive
        }`}
      >
        Reposts
      </button>

      <button
        onClick={() => setSelectInteraction("favorites")}
        className={`w-full text-center pb-2 ${
          selectInteraction === "favorites" ? classActive : classInactive
        }`}
      >
        Favoritos
      </button>
    </div>
  );
};

export default TabInteractions;
