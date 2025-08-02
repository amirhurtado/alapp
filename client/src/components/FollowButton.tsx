'use client'
interface FollowButtonProps {
  currentUserId: string;
  otherUserId: string;
}

const FollowButton = ({
  currentUserId,
  otherUserId,
}: FollowButtonProps) => {
  console.log(currentUserId, otherUserId);
  return (
    <div className="text-black bg-white px-3 rounded-lg h-8 flex items-center cursor-pointer">
      <button aria-label="Seguir" className="text-sm  cursor-pointer ">
        Seguir
      </button>
    </div>
  );
};

export default FollowButton;
