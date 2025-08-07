import Link from "next/link";

interface AuthorInfoProps {
  isMyPost: boolean;
  author: {
    name: string;
    displayName: string;
  };
}

const AuthorInfo = ({ isMyPost, author }: AuthorInfoProps) => {
  return (
    <div className="flex gap-1 items-center">
      <Link
        href={`/${author.name}`}
        className={`font-semibold text-[.92rem] cursor-pointer hover:underline $`}
      >
        {author.name}
        {isMyPost && (
          <span className="text-[0.6rem] text-primary-color"> (Tú)</span>
        )}
      </Link>
      <p className="text-text-gray text-[.83rem]">@{author.displayName}</p>
    </div>
  );
};

export default AuthorInfo;
