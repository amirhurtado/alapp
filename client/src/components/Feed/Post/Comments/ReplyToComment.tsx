"use client";
import { createCommentAction } from "@/actions/comment";
import { ChevronDown, CornerDownRight, Minus } from "lucide-react";
import React, { useState } from "react";

interface ReplyToCommentProps {
  comment: {
    id: number;
    authorName: string;
    responses: number;
  };
  postId: number;
  currentUserIdLog: string;
}

const ReplyToComment = ({
  comment,
  currentUserIdLog,
  postId,
}: ReplyToCommentProps) => {
  const [content, setContent] = useState("");
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

      <form
        className="flex items-center gap-3 ml-[.4rem] w-full justify-between"
        action={async (formData) => {
          await createCommentAction(formData);
          setContent("");
        }}
      >
        <input type="hidden" name="parentId" value={comment.id} />
        <input type="hidden" name="postId" value={postId} />

        <input type="hidden" name="userId" value={currentUserIdLog} />
        <div className="flex gap-7 items-center w-full">
          <CornerDownRight size={18} />
          <input
            type="text"
            placeholder={`Contestale a ${comment.authorName}`}
            className="placeholder:font-poppins outline-none border-none  w-full"
            name="content"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </div>

        <button
          className="font-semibold cursor-pointer text-xs text-icon-green active:scale-[0.95] transition-transform duration-200 ease-in"
          disabled={content === ""}
        >
          Responder
        </button>
      </form>
    </div>
  );
};

export default ReplyToComment;
