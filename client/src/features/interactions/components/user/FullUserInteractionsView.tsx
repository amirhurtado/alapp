"use client";
import { FullPostType } from "@/types";
import InteractionsTab from "./InteractionsTab";
import { useState } from "react";
import LikedPostsByUser from "./LikedPostsByUser";
import FavoritePostsByUser from "./FavoritePostsByUser";

interface FullUserInteractionsViewProps {
  likePosts: FullPostType[];
  userIdInteraction: string
  currentUserId: string
}

const FullUserInteractionsView = ({ likePosts, userIdInteraction, currentUserId }: FullUserInteractionsViewProps) => {
  const [selectInteraction, setSelectInteraction] = useState<
    "likes" | "reposts" | "favorites"
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

      {selectInteraction === "favorites" && <FavoritePostsByUser userIdInteraction={userIdInteraction} currentUserId={currentUserId} /> }
    </div>
  );
};

export default FullUserInteractionsView;
