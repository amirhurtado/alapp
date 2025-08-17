"use client";
import { useState } from "react";
import TabInteractions from "../InteractionsTab";
import UsersWithLikeInPost from "./UsersWithLikeInPost";

interface FullPostInteractionsViewProps {
  userLikesInPost: {
    id: string;
    name: string;
    displayName: string;
    imageUrl: string;
  }[];
  postId: number
}

const FullPostInteractionsView = ({
  userLikesInPost,
  postId
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
        {selectInteraction === "likes" && <UsersWithLikeInPost  userLikesInPost={userLikesInPost} postId={postId}/>}
      </div>
    </div>
  );
};

export default FullPostInteractionsView;
