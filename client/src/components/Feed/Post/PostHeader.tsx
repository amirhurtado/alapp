import Link from "next/link";
import PostInfo from "./PostInfo";
import CreatedAt from "./CreatedAt";

interface PostHeaderProps {
  isMyPost: boolean;
  author: {
    name: string;
    displayName: string;
  };

  createdAt: Date;
}

const PostHeader = ({ isMyPost, author, createdAt }: PostHeaderProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-top  ">
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
          <div className="hidden md:block ">
            <CreatedAt createdAt={createdAt} />
          </div>
        </div>

        <PostInfo />
      </div>

      <div className="block md:hidden ">
        <CreatedAt createdAt={createdAt} />
      </div>
    </div>
  );
};

export default PostHeader;
