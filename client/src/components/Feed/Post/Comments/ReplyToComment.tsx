"use client";
import { ChevronDown, CornerDownRight, Minus } from "lucide-react";
import React from "react";

interface ReplyToCommentProps {
  comment: {
    id: number;
    authorName: string
  responses: number;

  }
  currentUserIdLog: string;
}

const ReplyToComment = ({  comment }: ReplyToCommentProps) => {
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex items-center gap-1 text-xs text-text-gray">
        <Minus size={20} className="" />
        {comment.responses === 0 ? (
          <p>No hay respuestas</p>
        ) : (
          <p>Ver {comment.responses} respuestas</p>
        )}

        {comment.responses !== 0 && (
          <ChevronDown className="text-icon-blue" size={20} />
        )}
      </div>


      <div className="flex items-center gap-3 ml-[.4rem] w-full justify-between ">

        <div className="flex gap-6 items-center w-full">
        <CornerDownRight size={18} />
        <input type="text" placeholder={`Contestale a ${comment.authorName}`}  className="placeholder:font-poppins outline-none border-none  w-full"/>
        </div>
        
        <button className="font-semibold cursor-pointer text-xs text-icon-blue">Responder</button>
      </div>
    </div>
  );
};

export default ReplyToComment;
