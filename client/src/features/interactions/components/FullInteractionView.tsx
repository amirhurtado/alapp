"use client";
import { FullPostType } from "@/types";
import InteractionsTab from "./InteractionsTab";
import { useState } from "react";
import LikedPostsByUser from "./LikedPostsByUser";

interface FullInteractionViewProps {
  likePosts: FullPostType[];
  userIdInteraction: string
  currentUserId: string
}

const FullInteractionView = ({ likePosts, userIdInteraction, currentUserId }: FullInteractionViewProps) => {
  const [selectInteraction, setSelectInteraction] = useState<
    "likes" | "comment" | "reposts" | "favorites"
  >("likes");
  return (
    <div className="flex flex-col max-h-screen  overflow-hidden ">
      <InteractionsTab
        selectInteraction={selectInteraction}
        setSelectInteraction={setSelectInteraction}
      />
      {selectInteraction === "likes" && (
        <LikedPostsByUser likePosts={likePosts} userIdInteraction={userIdInteraction} currentUserId={currentUserId} />
      )}
    </div>
  );
};

export default FullInteractionView;
