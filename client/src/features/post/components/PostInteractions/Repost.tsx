'use client'
import { toggleRepostAction } from "@/actions/post";
import { Repeat2 } from "lucide-react";

interface RepostProps {
  reposts: Array<{ userId: string }>;
  currentUserIdLog: string;
  postId: number;
}

const Repost = ({
  reposts,
  currentUserIdLog,
  postId,
}: RepostProps) => {
  const handleRepostClick = async () => {
    await toggleRepostAction(postId, currentUserIdLog);
  };

  const reposted = reposts.some((repost) => repost.userId === currentUserIdLog )

  return (
    <div
      className={`flex gap-1 ${
        reposted ? "text-icon-green" : "text-text-gray"
      }  items-center group cursor-pointer  hover:text-icon-green hover:scale-[1.05] transition-transform ease-in duration-200`}
      onClick={handleRepostClick}
    >
      {" "}
      <Repeat2 size={18} />
      <p>{reposts.length}</p>
    </div>
  );
};

export default Repost;
