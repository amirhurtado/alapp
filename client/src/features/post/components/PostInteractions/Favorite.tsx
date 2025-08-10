"use client";

import { Star } from "lucide-react";
import { useFavoriteMutation } from "../../hooks/useFavoriteMutation";

interface FavoriteProps {
  favorites: Array<{ userId: string }>;
  currentUserId: string; 
  postId: number
}

const Favorite = ({ favorites, currentUserId, postId }: FavoriteProps) => {
  const {mutate} = useFavoriteMutation(["posts"]);

  const inFavorites = favorites.some(
    (favorite) => favorite.userId === currentUserId
  );

  const onFavorites = () => {
    mutate({postId, userId: currentUserId})
  }

  return (
    <Star
      onClick={onFavorites}
      size={18}
      className={` ${
        inFavorites ? "text-icon-yellow" : "text-text-gray"
      } hover:text-icon-yellow cursor-pointer transition-colors duration-200 ease-in`}
    />
  );
};

export default Favorite;
