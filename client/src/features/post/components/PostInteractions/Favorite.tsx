"use client";

import { Star } from "lucide-react";

interface FavoriteProps {
  favorites: Array<{ userId: string }>;
  currentUserId: string;
  onFavorite: () => void;
}

const Favorite = ({ favorites, currentUserId, onFavorite }: FavoriteProps) => {
  const inFavorites = favorites.some(
    (favorite) => favorite.userId === currentUserId
  );

  return (
    <Star
      onClick={onFavorite}
      size={18}
      className={` ${
        inFavorites ? "text-icon-yellow" : "text-text-gray"
      } hover:text-icon-yellow cursor-pointer transition-colors duration-200 ease-in`}
    />
  );
};

export default Favorite;
