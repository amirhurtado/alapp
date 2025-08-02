import { toggleLikeAction } from "@/actions/post";
import { Heart } from "lucide-react";

interface LikeProps {
  like: boolean;
  likesNumber: number;
  currentUserId: string;
  currentPostId: number;
}

const Like = ({
  like,
  likesNumber,
  currentUserId,
  currentPostId,
}: LikeProps) => {
  const handleLikeClick = async () => {
    await toggleLikeAction(currentPostId, currentUserId);
  };

  return (
    <div
      className={`flex ${
        like ? "text-icon-pink" : "text-text-gray"
      } gap-1 items-center group cursor-pointer hover:text-icon-pink hover:scale-[1.05] transition-transform ease-in duration-200`}
      onClick={handleLikeClick}
    >
      <Heart size={18} />
      <p>{likesNumber}</p>
    </div>
  );
};

export default Like;
