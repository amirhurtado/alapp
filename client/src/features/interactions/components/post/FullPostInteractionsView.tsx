"use client";
import { useState } from "react";
import TabInteractions from "../InteractionsTab";
import UsersWithLikeInPost from "./UsersWithLikeInPost";
import { UserCardType } from "@/types";

interface FullPostInteractionsViewProps {
  userLikesInPost: UserCardType[],
  postId: number
  currentUserId: string
}

const FullPostInteractionsView = ({
  userLikesInPost,
  postId,
  currentUserId
}: FullPostInteractionsViewProps) => {
  const [selectInteraction, setSelectInteraction] = useState<
    "likes" | "reposts" | "favorites"
  >("likes");

  return (
    <div className=" max-h-screen overflow-hidden flex flex-col">
      <TabInteractions
        selectInteraction={selectInteraction}
        setSelectInteraction={setSelectInteraction}
      />
      <div className="">
        {selectInteraction === "likes" && <UsersWithLikeInPost  userLikesInPost={userLikesInPost} postId={postId} currentUserId={currentUserId} />}
      </div>
    </div>
  );
};

export default FullPostInteractionsView;
