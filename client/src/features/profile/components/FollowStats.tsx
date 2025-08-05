interface FollowStastsProps {
  followings: number;
  folowers: number;
}

const FollowStats = ({ followings, folowers }: FollowStastsProps) => {
  return (
    <div className="flex gap-5 mt-3">
      <div className="flex items-end gap-1 hover:underline cursor-pointer">
        <p className="text-sm">{followings}</p>
        <span className="text-text-gray text-xs">Siguiendo</span>
      </div>
      <div className="flex items-end gap-1 hover:underline cursor-pointer ">
        <p className="text-sm">{folowers}</p>
        <span className="text-text-gray text-xs">Seguidores</span>
      </div>
    </div>
  );
};

export default FollowStats;
