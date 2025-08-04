'use client'
import { toggleLikePostAction } from "@/actions/post";
import { Heart } from "lucide-react";

interface LikeProps {
  liked: boolean;
  likes: number;
  currentUserIdLog: string;
  postId: number;
}

const Like = ({
  liked,
  likes,
  currentUserIdLog,
  postId,
}: LikeProps) => {
  const handleLikeClick = async () => {
    await toggleLikePostAction(postId, currentUserIdLog);
  };

  return (
    <div
      className={`flex ${
        liked ? "text-icon-pink" : "text-text-gray"
      } gap-1 items-center group cursor-pointer hover:text-icon-pink hover:scale-[1.05] transition-transform ease-in duration-200`}
      onClick={handleLikeClick}
    >
      <Heart size={18} />
      <p>{likes}</p>
    </div>
  );
};

export default Like;
