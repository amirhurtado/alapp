"use client";
import { FullPostType } from "@/types";
import InteractionsTab from "../InteractionsTab";
import { useState } from "react";
import LikedPostsByUser from "./LikedPostsByUser";
import FavoritePostsByUser from "./FavoritePostsByUser";
import RepostedPostsByUser from "./RepostedPostsByUser";

interface FullUserInteractionsViewProps {
  likePosts: FullPostType[];
  userIdInteraction: string;
  currentUserId: string;
  inMyInteractions: boolean
}

const FullUserInteractionsView = ({
  likePosts,
  userIdInteraction,
  currentUserId,
  inMyInteractions
}: FullUserInteractionsViewProps) => {
  const [selectInteraction, setSelectInteraction] = useState<
    "likes" | "reposts" | "favorites"
  >("likes");
  return (
    <div className="flex flex-col max-h-[100dvh]  overflow-hidden ">
      <InteractionsTab
        selectInteraction={selectInteraction}
        setSelectInteraction={setSelectInteraction}
        inMyInteractions={inMyInteractions}
      />
      {selectInteraction === "likes" && (
        <LikedPostsByUser
          likePosts={likePosts}
          userIdInteraction={userIdInteraction}
          currentUserId={currentUserId}
        />
      )}


      {selectInteraction === "reposts" && (
        <RepostedPostsByUser
          userIdInteraction={userIdInteraction}
          currentUserId={currentUserId}
        />
      )}

      {selectInteraction === "favorites" && (
        <FavoritePostsByUser
          userIdInteraction={userIdInteraction}
          currentUserId={currentUserId}
        />
      )}
    </div>
  );
};

export default FullUserInteractionsView;
