import React from "react";
import Search from "./Search";
import PopularTags from "./PopularTags";
import Recomendations from "./Recomendations";

const RightBar = () => {
  return (
    <div className="flex flex-col justify-between gap-4 h-screen py-10">
      <div className="flex flex-col gap-4">
        <Search />
        <PopularTags />
        <Recomendations />
      </div>

      <div className="flex flex-wrap gap-4 text-text-gray text-xs">
        <p>Accesibilidad</p>
        <p>Politicas</p>
        <p>&copy; Amir Hurtado 2025 (basado en red social X)</p>
      </div>
    </div>
  );
};

export default RightBar;
