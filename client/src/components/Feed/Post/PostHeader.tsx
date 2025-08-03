import Link from "next/link";
import TimeAgo from "../../TimeAgo";
import PostInfo from "./PostInfo";
import { Dot } from "lucide-react";

interface PostHeaderProps {
  isMyPost: boolean;
  author: {
    name: string;
    displayName: string;
  };

  createdAt: Date;
}

const PostHeader = ({
  isMyPost,
  author,
  createdAt,
}: PostHeaderProps) => {
  return (
    <div className="flex justify-between items-top">
      <div className="flex gap-1 items-center flex-1">
        <Link
          href={`/${author.name}`}
          className={`font-semibold text-[.92rem] cursor-pointer hover:underline $`}
        >
          {author.name}
          {isMyPost && (
            <span className="text-[0.6rem] text-icon-blue"> (Tú)</span>
          )}
        </Link>
        <p className="text-text-gray text-[.83rem]">@{author.displayName}</p>
        <Dot size={10} className="text-text-gray" />
        <TimeAgo date={createdAt} />
      </div>
      <PostInfo />
    </div>
  );
};

export default PostHeader;
