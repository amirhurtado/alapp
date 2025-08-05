"use client";

import { LoaderCircle } from "lucide-react";
import React from "react";
import { Comment } from "./Comment/Comment";
import { useInfinityComments } from "../../hooks/useInfiniteComments"; 
import { FullCommentType } from "@/types";

interface InfinityCommentsProps { 
  comments : Array<FullCommentType>
  postId: number;
  currentUserId: string;
}

const InfinityComments = ({
  comments,
  postId,
  currentUserId,
}: InfinityCommentsProps) => {
  const { data, hasMore, loadMoreRef } = useInfinityComments(
    comments,
    postId
  );

  return (
    <div>
      {data.map((comment, index) => (
        <div key={index}>
          <Comment
            comment={comment}
            currentUserId={currentUserId}
          />
        </div>
      ))}
      <div
        ref={loadMoreRef}
        className="h-[2rem] flex items-center justify-center py-8"
      >
        {hasMore ? (
          <LoaderCircle
            className="animate-spin mx-auto text-icon-blue "
            size={24}
          />
        ) : (
          <p className="text-center text-text-gray text-sm">
            No hay más comentarios
          </p>
        )}
      </div>
    </div>
  );
};

export default InfinityComments;