"use client";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import CreateCommentReply from "./CreateCommentReply";
import { getCommentsByParentIdAction } from "@/actions/comment";
import { FullCommentType } from "@/types";
import Comment from "../Comment/Comment";

interface CommentRepliesProps {
  comment: {
    id: number;
    authorName: string;
    responses: number;
  };
  postId: number;
  currentUserIdLog: string;
}

const CommentReplies = ({
  comment,
  postId,
  currentUserIdLog,
}: CommentRepliesProps) => {
  const [request, setrequest] = useState(1);
  const [data, setData] = useState<Array<FullCommentType>>([]);

  return (
    <div className="flex flex-col overflow-hidden gap-3">
      <div className="flex items-end gap-1 text-xs ">
        {comment.responses > 0 && (
          <div className="flex flex-col gap-3 w-full">
            <div className="ml-7">
              {data.map((comment) => (
                <div key={comment.id} className="w-full">
                  <Comment
                    comment={comment}
                    currentUserIdLog={currentUserIdLog}
                    commentReply={true}
                  />
                </div>
              ))}
            </div>

            <button
              className=" text-text-gray hover:text-icon-blue flex  gap-1 text-xs cursor-pointer"
              onClick={async () => {
                const comments = await getCommentsByParentIdAction(
                  comment.id,
                  request
                );
                setData((prev) => {
                  return [...prev, ...comments];
                });
                setrequest((prev) => prev + 1);
              }}
            >
              <p className=" transition-colors duration-200 ease-in ">
                Ver {comment.responses} respuestas
              </p>
              <ChevronDown size={20} />
            </button>
          </div>
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

export default CommentReplies;
