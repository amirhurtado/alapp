import Link from "next/link";

interface FollowStastsProps {
  username: string
  followings: number;
  followers: number;
}

const FollowStats = ({username, followings, followers  }: FollowStastsProps) => {
  return (
    <div className="flex gap-5 mt-3">
      <Link href={`/${username}/follows?query=following`} className="flex items-end gap-1 hover:underline cursor-pointer">
        <p className="text-sm">{followings}</p>
        <span className="text-text-gray text-xs">Siguiendo</span>
      </Link>
      <Link  href={`/${username}/follows?query=followers`} className="flex items-end gap-1 hover:underline cursor-pointer ">
        <p className="text-sm">{followers}</p>
        <span className="text-text-gray text-xs">Seguidores</span>
      </Link>
    </div>
  );
};

export default FollowStats;
