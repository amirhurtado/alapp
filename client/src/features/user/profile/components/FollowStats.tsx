interface FollowStastsProps {
  followings: number;
  followers: number;
}

const FollowStats = ({ followings, followers }: FollowStastsProps) => {
  return (
    <div className="flex gap-5 mt-3">
      <div className="flex items-end gap-1 hover:underline cursor-pointer">
        <p className="text-sm">{followings}</p>
        <span className="text-text-gray text-xs">Siguiendo</span>
      </div>
      <div className="flex items-end gap-1 hover:underline cursor-pointer ">
        <p className="text-sm">{followers}</p>
        <span className="text-text-gray text-xs">Seguidores</span>
      </div>
    </div>
  );
};

export default FollowStats;
