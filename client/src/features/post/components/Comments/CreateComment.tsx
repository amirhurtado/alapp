"use client";
import { createCommentAction } from "@/actions/comment";
import Avatar from "@/components/ui/Avatar";
import { useState } from "react";

interface CreateCommentType {
  currentUserLog: {
     id : string,
    imgUrl: string;
  }
 
  postId: number
}

const CreateComment = ({ currentUserLog, postId }: CreateCommentType) => {
  const [content, setContent] = useState<string>("");

  return (
    <form
      className="pt-4 pb-6 px-4 flex justify-between gap-3"
      action={async (formData) => {
        await createCommentAction(formData);
        setContent("")
      }}
    >
      <div className="flex gap-3 w-full">
        <Avatar src={currentUserLog.imgUrl} />
        <input type="hidden" value={postId} name="postId" />
        <input type="hidden" value={currentUserLog.id} name="userId" />
        <input
          type="text"
          className="outline-none  placeholder:font-poppins w-full border-none "
          placeholder="Deja tu comentario"
          name="content"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
      </div>
      <button
        disabled={content === ""}
        aria-label="enviar comentario"
        className="text-icon-green font-semibold text-sm cursor-pointer active:scale-[0.95] transition-transform duration-200 ease-in"
      >
        Enviar
      </button>
    </form>
  );
};

export default CreateComment;
