"use client";
import { createCommentAction } from "@/actions/comment";
import Avatar from "../../Avatar";
import { useState } from "react";

interface CreateCommentType {
  userImageUrl: string;
  postId: number;
  userId: string;
}

const CreateComment = ({ userImageUrl, postId, userId }: CreateCommentType) => {
  const [content, setContent] = useState<string>("");

  return (
    <form
      className="p-4 flex justify-between gap-3"
      action={async (formData) => {
        createCommentAction(formData);
      }}
    >
      <div className="flex gap-3 w-full">
        <Avatar src={userImageUrl} />
        <input type="hidden" value={postId} name="postId" />
        <input type="hidden" value={userId} name="userId" />
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
        className="text-icon-blue font-semibold text-sm cursor-pointer active:scale-[0.95] transition-transform duration-200 ease-in"
      >
        Enviar
      </button>
    </form>
  );
};

export default CreateComment;
