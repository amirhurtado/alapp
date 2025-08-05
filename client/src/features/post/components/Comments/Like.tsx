'use client'
import { toggleLikeCommentAction } from "@/actions/comment";
import { Heart } from "lucide-react";

interface LikeProps {
  likes: Array<{userId: string}>;
  currentUserId: string;
  commentId: number;
}

const Like = ({
  likes,
  currentUserId,
  commentId,
}: LikeProps) => {
  const handleLikeClick = async () => {
    await toggleLikeCommentAction(currentUserId, commentId);
  };

  const liked = likes.some((like) => like.userId === currentUserId)

  return (
    <div
      className={`flex ${
        liked ? "text-icon-pink" : "text-text-gray"
      } gap-1 items-center group cursor-pointer hover:text-icon-pink hover:scale-[1.05] transition-transform ease-in duration-200`}
      onClick={handleLikeClick}
    >
      <Heart size={18} />
      <p className="text-sm">{likes.length}</p>
    </div>
  );
};

export default Like;
