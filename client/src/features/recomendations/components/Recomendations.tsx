import { getRecomentationsAction } from "@/actions/user";

import React from "react";
import InfiniteRecommendations from "../InfiniteRecommendations";

const Recomendations = async ({ currentUserId }: { currentUserId: string }) => {
  const recomendations = await getRecomentationsAction(currentUserId, []);

  return (
    <div className="flex flex-col gap-4 border-1 border-border rounded-xl p-4">
      <p className="text-md font-bold">Recomendaciones para ti</p>

      <InfiniteRecommendations
        initialRecommendations={recomendations}
        currentUserId={currentUserId}
      />
    </div>
  );
};

export default Recomendations;
