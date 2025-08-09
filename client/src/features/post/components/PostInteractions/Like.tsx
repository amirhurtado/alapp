'use client'
import { toggleLikePostAction } from "@/actions/post";
import { Heart } from "lucide-react";

interface LikeProps {
  likes : Array<{userId: string}>
  currentUserId: string;
  postId: number;
}

const Like = ({
  likes,
  currentUserId,
  postId,
}: LikeProps) => {
  const handleLikeClick = async () => {
    await toggleLikePostAction(postId, currentUserId);
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
      <p>{likes.length}</p>
    </div>
  );
};

export default Like;
