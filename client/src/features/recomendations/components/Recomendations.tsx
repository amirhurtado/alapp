import { getRecomentationsAction } from "@/actions/user";

import React from "react";
import InfiniteRecommendations from "../InfiniteRecommendations";

interface RecommendationsProps{
  currentUserId: string
  placement: "rightbar" | "explore"
}

const Recomendations = async ({ currentUserId, placement }: RecommendationsProps) => {
  const recomendations = await getRecomentationsAction(currentUserId, []);


  return (
    <div className="flex flex-col gap-4 border-1 border-border rounded-xl p-4 max-h-[19rem] overflow-hidden">
      <p  className={`${placement === "explore" && "mt-3 md:mt-0"} text-md font-bold`}>Recomendaciones para ti</p>

      <InfiniteRecommendations
        initialRecommendations={recomendations}
        currentUserId={currentUserId}
         placement={placement}
      />
    </div>
  );
};

export default Recomendations;
