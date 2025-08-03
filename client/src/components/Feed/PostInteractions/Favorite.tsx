"use client";

import { toggleFavoriteAction } from "@/actions/post";
import { Star } from "lucide-react";

interface FavoriteProps {
  inFavorite: boolean; // Indicates if the post is favorited by the current user
  currentUserIdLog: string; // ID of the current user
  postId: number; // ID of the post being favorited
}

const Favorite = ({
  inFavorite,
  currentUserIdLog,
  postId,
}: FavoriteProps) => {
  const handleFavoriteClick = async () => {
    toggleFavoriteAction(postId, currentUserIdLog);
  };

  return (
    <Star
      onClick={handleFavoriteClick}
      size={18}
      className={` ${
        inFavorite ? "text-icon-yellow" : "text-text-gray"
      } hover:text-icon-yellow cursor-pointer transition-colors duration-200 ease-in`}
    />
  );
};

export default Favorite;
