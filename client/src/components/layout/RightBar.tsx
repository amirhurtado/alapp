import React from "react";
import Search from "@/features/search/components/Search";
import PopularTags from "@/features/popular/components/PopularTags";
import Recomendations from "@/features/recomendations/components/Recommendations";

const RightBar = ({currentUserId}: {currentUserId: string}) => {
  return (
    <div className="flex flex-col justify-between gap-4 h-screen py-10">
      <div className="flex flex-col gap-4">
        <Search />
        <PopularTags />
        <Recomendations currentUserId={currentUserId} placement={"rightbar"} />
      </div>

      <div className="flex flex-wrap gap-4 text-text-gray text-xs">
        <p>Accesibilidad</p>
        <p>Politicas</p>
        <p>&copy; Amir Hurtado -Santiago Rudas - Santiago Ramirez 2025 </p>
      </div>
    </div>
  );
};

export default RightBar;
