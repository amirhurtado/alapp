import { MessageSquare } from "lucide-react";
import FollowButton from "../FollowButton";

interface ProfileActionsProps {
  myProfile : boolean,
  currentUserId: string,
  userProfileInfoId: string
}

const ProfileActions = ({ myProfile, currentUserId, userProfileInfoId }: ProfileActionsProps) => {
  return (
    <div className="flex justify-end px-3 pt-4">
      {myProfile ? (
        <button aria-label="editar perfil" className="cursor-pointer bg-icon-blue px-3 rounded-lg h-8  text-black ">
          <p className="text-sm">Editar perfil</p>
        </button>
      ) : (
        <div className="flex gap-4 items-center">
          <button  aria-label="Enviar mensaje" className="border-1 border-border rounded-full w-10 h-10 flex items-center justify-center">
            <MessageSquare size={20} className="" />
          </button>
          <FollowButton  currentUserId={currentUserId} otherUserId={userProfileInfoId}/>
        </div>
      )}
    </div>
  );
};

export default ProfileActions;
