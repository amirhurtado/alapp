'use client'
import { toggleRepostAction } from "@/actions/post";
import { Repeat2 } from "lucide-react";

interface RepostProps {
  repost: boolean;
  reposts: number;
  currentUserId: string;
  currentPostId: number;
}

const Repost = ({
  repost,
  reposts,
  currentUserId,
  currentPostId,
}: RepostProps) => {
  const handleRepostClick = async () => {
    await toggleRepostAction(currentPostId, currentUserId);
  };

  return (
    <div
      className={`flex gap-1 ${
        repost ? "text-icon-green" : "text-text-gray"
      }  items-center group cursor-pointer  hover:text-icon-green hover:scale-[1.05] transition-transform ease-in duration-200`}
      onClick={handleRepostClick}
    >
      {" "}
      <Repeat2 size={18} />
      <p>{reposts}</p>
    </div>
  );
};

export default Repost;
