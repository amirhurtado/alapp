import { MessageSquare, SquarePen } from "lucide-react";
import FollowButton from "./FollowButton";
import { isFriendAction } from "@/actions/user";
import Link from "next/link";

interface ProfileActionsProps {
  isMyProfile : boolean,
  currentUserIdLog: string,
  userProfileInfoId: string
}

const ProfileActions =  async ({ isMyProfile, currentUserIdLog, userProfileInfoId }: ProfileActionsProps) => {

  const isFriend = await isFriendAction(currentUserIdLog, userProfileInfoId )


  return (
    <div className="flex justify-end px-3 pt-4">
      {isMyProfile ? (
        <Link href={`/edit-profile`}
            className="flex gap-2 cursor-pointer  border-1 border-border items-center justify-center rounded-lg px-2 py-2 active:scale-[0.95] hover:bg-icon-blue transition-all duration-200 ease-in"
          >
            <SquarePen size={20} strokeWidth={1} />
            <p className="text-xs">Editar perfil</p>
          </Link >
      ) : (
        <div className="flex gap-4 items-center">
          <button  aria-label="Enviar mensaje" className="border-1 border-border rounded-full w-10 h-10 flex items-center justify-center">
            <MessageSquare size={20} className="" />
          </button>
          <FollowButton isFriend={isFriend}  currentUserIdLog={currentUserIdLog} otherUserId={userProfileInfoId}/>
        </div>
      )}
    </div>
  );
};

export default ProfileActions;
