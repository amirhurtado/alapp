'use client'
import { toggleLikeCommentAction } from "@/actions/comment";
import { Heart } from "lucide-react";

interface LikeProps {
  liked: boolean;
  likes: number;
  currentUserIdLog: string;
  commentId: number;
}

const Like = ({
  liked,
  likes,
  currentUserIdLog,
  commentId,
}: LikeProps) => {
  const handleLikeClick = async () => {
    await toggleLikeCommentAction(currentUserIdLog, commentId);
  };

  return (
    <div
      className={`flex ${
        liked ? "text-icon-pink" : "text-text-gray"
      } gap-1 items-center group cursor-pointer hover:text-icon-pink hover:scale-[1.05] transition-transform ease-in duration-200`}
      onClick={handleLikeClick}
    >
      <Heart size={18} />
      <p className="text-sm">{likes}</p>
    </div>
  );
};

export default Like;
