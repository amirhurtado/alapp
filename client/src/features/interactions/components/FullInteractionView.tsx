"use client";
import { FullPostType } from "@/types";
import InteractionsTab from "./InteractionsTab";
import { useState } from "react";
import LikedPostsByUser from "./LikedPostsByUser";

interface FullInteractionViewProps {
  likePosts: FullPostType[];
  userIdInteraction: string
}

const FullInteractionView = ({ likePosts, userIdInteraction }: FullInteractionViewProps) => {
  const [selectInteraction, setSelectInteraction] = useState<
    "likes" | "comment" | "reposts" | "favorites"
  >("likes");
  return (
    <div>
      <InteractionsTab
        selectInteraction={selectInteraction}
        setSelectInteraction={setSelectInteraction}
      />
      {selectInteraction === "likes" && (
        <LikedPostsByUser likePosts={likePosts} userIdInteraction={userIdInteraction} />
      )}
    </div>
  );
};

export default FullInteractionView;
