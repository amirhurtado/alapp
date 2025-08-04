import { getRecomentationsAction, isFriendAction } from "@/actions/user";
import FollowButton from "@/components/Profile/ProfileActions/FollowButton";
import Link from "next/link";
import React from "react";
import Avatar from "../Avatar";

const Recomendations = async ({ currentUserIdLog }: { currentUserIdLog: string }) => {
  const recomendations = await getRecomentationsAction(currentUserIdLog);

  const isFriendList = await Promise.all (recomendations.map((user) => isFriendAction(currentUserIdLog, user.id)))
  
  return (
    <div className="flex flex-col gap-4 border-1 border-border rounded-xl p-4">
      <p className="text-md font-bold">Recomendaciones para ti</p>
      <div className="flex flex-col gap-2">
        {recomendations &&
          recomendations.map((user, index) => (
            <div
              key={index}
              className="flex justify-between p-2 hover:bg-hover rounded-lg  border-1 border-border transition-colors duration-200 ease-in"
            >
              <div className="flex gap-3 items-center">
                <Avatar src={user.imageUrl} />

                <div className="flex flex-col">
                  <Link href={`/${user.name}`}>
                    <p className="text-sm font-semibold cursor-pointer hover:underline">
                      {user.name}
                    </p>
                  </Link>
                  <p className="text-xs text-text-gray">@{user.displayName}</p>
                </div>
              </div>
              <FollowButton
                isFriend={isFriendList[index]}
                currentUserIdLog={currentUserIdLog}
                otherUserId={user.id}
              />
            </div>
          ))}
      </div>
      {recomendations.length === 3 && (
        <p className="text-icon-blue text-sm cursor-pointer">Ver más</p>
      )}
    </div>
  );
};

export default Recomendations;
