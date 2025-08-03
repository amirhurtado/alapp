"use client";
import { ChevronDown, Minus } from "lucide-react";
import React, { useState } from "react";
import CreateCommentReply from "./CreateCommentReply";

interface CommentRepliesSectionProps {
  comment: {
    id: number;
    authorName: string;
    responses: number;
  };
  postId: number;
  currentUserIdLog: string;
}

const CommentRepliesSection = ({
  comment,
  currentUserIdLog,
  postId,
}: CommentRepliesSectionProps) => {
  const [commentWatched, setCommentWatched] = useState(0);

  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex items-center gap-1 text-xs text-text-gray ">
        <Minus size={20} className="" />
        {comment.responses === 0 ? (
          <p>No hay respuestas</p>
        ) : (
          <button
            className=" hover:text-icon-blue flex items-center gap-1 text-xs cursor-pointer"
            onClick={() => console.log("Quiero ver respuestas")}
          >
            <p className=" transition-colors duration-200 ease-in">
              Ver {comment.responses} respuestas
            </p>
            <ChevronDown size={20} />
          </button>
        )}
      </div>

      <CreateCommentReply
        comment={{ id: comment.id, authorName: comment.authorName }}
        postId={postId}
        currentUserIdLog={currentUserIdLog}
      />
    </div>
  );
};

export default CommentRepliesSection;
