"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";
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
  currentUserId: string;
}

const CommentReplies = ({
  comment,
  postId,
  currentUserId,
}: CommentRepliesProps) => {
  const [request, setrequest] = useState(1);
  const [data, setData] = useState<Array<FullCommentType>>([]);
  const [hasMore, setHasmore] = useState(true);
  const [ocult, setOcult] = useState(false);

  useEffect(() => {
    if (data.length === comment.responses) {
      setHasmore(false);
    }
  }, [data, comment]);

   const handleResponsesLength = async () => {
    if (ocult && data.length > 0) {
      setOcult(false);
      return; 
    }

    if (hasMore) {
      const comments = await getCommentsByParentIdAction(
        comment.id,
        request
      );
      setData((prev) => [...prev, ...comments]);
      setrequest((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col overflow-hidden gap-3">
      {!ocult && (
        <div className="ml-7">
          {data.map((comment) => (
            <div key={comment.id} className="w-full">
              <Comment
                comment={comment}
                currentUserId={currentUserId}
                commentReply={true}
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-4 items-center text-text-gray max-w-max text-xs ">
        {(hasMore || ocult) && (
          <button
            onClick={handleResponsesLength}
          >
            <div className="flex  gap-1 cursor-pointer hover:text-icon-blue ">
              <p className="transition-colors duration-200 ease-in">
                {ocult
                  ? `Ver ${comment.responses } respuestas`
                  : `Ver ${comment.responses - data.length} respuestas`} 
              </p>
              <ChevronDown size={20} />
            </div>
          </button>
        )}

        {data.length > 0 && !ocult && (
          <button onClick={() => setOcult(true)}>
            <div className="flex  gap-1 cursor-pointer hover:text-icon-blue ">
              <p className=" transition-colors duration-200 ease-in ">
                Ocultar Todo
              </p>
              <ChevronUp size={20} />
            </div>
          </button>
        )}
      </div>

      <CreateCommentReply
        comment={{ id: comment.id, authorName: comment.authorName }}
        postId={postId}
        currentUserId={currentUserId}
      />
    </div>
  );
};

export default CommentReplies;
