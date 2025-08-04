"use client";

import { toggleFavoriteAction } from "@/actions/post";
import { Star } from "lucide-react";

interface FavoriteProps {
  favorites: Array<{userId: string}>
  currentUserIdLog: string; // ID of the current user
  postId: number; // ID of the post being favorited
}

const Favorite = ({
  favorites,
  currentUserIdLog,
  postId,
}: FavoriteProps) => {
  const handleFavoriteClick = async () => {
    toggleFavoriteAction(postId, currentUserIdLog);
  };

  const inFavorites = favorites.some((favorite) => favorite.userId === currentUserIdLog)

  return (
    <Star
      onClick={handleFavoriteClick}
      size={18}
      className={` ${
        inFavorites ? "text-icon-yellow" : "text-text-gray"
      } hover:text-icon-yellow cursor-pointer transition-colors duration-200 ease-in`}
    />
  );
};

export default Favorite;
