"use client";

import { handleFavoriteAction } from "@/actions/post";
import { Star } from "lucide-react";

interface FavoriteProps {
  favorite: boolean; // Indicates if the post is favorited by the current user
  currentUserId: string; // ID of the current user
  currentPostId: number; // ID of the post being favorited
}

const Favorite = ({
  favorite,
  currentUserId,
  currentPostId,
}: FavoriteProps) => {
  const handleFavoriteClick = async () => {
    handleFavoriteAction(currentPostId, currentUserId);
  };

  return (
    <Star
      onClick={handleFavoriteClick}
      size={18}
      className={` ${
        favorite ? "text-icon-yellow" : "text-text-gray"
      } hover:text-icon-yellow cursor-pointer transition-colors duration-200 ease-in`}
    />
  );
};

export default Favorite;
