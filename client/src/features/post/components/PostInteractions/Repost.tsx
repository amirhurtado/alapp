"use client";
import { Repeat2 } from "lucide-react";
import { useRepostMutation } from "../../hooks/useRepostMutation";

interface RepostProps {
  reposts: Array<{ userId: string }>;
  currentUserId: string;
  postId: number;
}

const Repost = ({ reposts, currentUserId, postId }: RepostProps) => {
  const { mutate } = useRepostMutation(["posts"]);
  const reposted = reposts.some((repost) => repost.userId === currentUserId);

  const onRepost = () => {
    mutate({ postId, userId: currentUserId });
  };

  return (
    <div
      className={`flex gap-1 ${
        reposted ? "text-icon-green" : "text-text-gray"
      }  items-center group cursor-pointer  hover:text-icon-green hover:scale-[1.05] transition-transform ease-in duration-200`}
      onClick={onRepost}
    >
      {" "}
      <Repeat2 size={18} />
      <p>{reposts.length}</p>
    </div>
  );
};

export default Repost;
