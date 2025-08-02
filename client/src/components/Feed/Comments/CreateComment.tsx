'use client'
import { createCommentAction } from "@/actions/comment";
import Avatar from "../../Avatar";

interface CreateCommentType {
  userImageUrl: string;
  postId: number;
  userId: string;
}

const CreateComment = ({ userImageUrl, postId, userId }: CreateCommentType) => {
  return (
    <form className="p-4 flex justify-between gap-3" action={async (formData) => {
      createCommentAction(formData)
    }}>
      <div className="flex gap-3 w-full">
        <Avatar src={userImageUrl} />
        <input type="hidden" value={postId} name="postId" />
        <input type="hidden" value={userId} name="userId" />
        <input
          type="text"
          className="outline-none  placeholder:font-poppins w-full border-none "
          placeholder="Deja tu comentario"
          name="content"
        />
      </div>
      <button
        aria-label="enviar comentario"
        className="text-icon-blue font-semibold text-sm cursor-pointer"
      >
        Enviar
      </button>
    </form>
  );
};

export default CreateComment;
