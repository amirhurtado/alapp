'use client'
import { createCommentAction } from "@/actions/comment";
import { CornerDownRight } from "lucide-react";
import { useState } from "react";


interface CreateCommentReplyProps {
  comment: {
    id: number;
    authorName: string;
  };
  postId: number;
  currentUserId: string;
}

const CreateCommentReply = ({comment, postId, currentUserId}: CreateCommentReplyProps) => {
  const [content, setContent] = useState("");

  return (
     <form
        className="flex items-center gap-3 ml-[.4rem] max-w-full justify-between"
        action={async (formData) => {
          await createCommentAction(formData);
          setContent("");
        }}
      >
        <input type="hidden" name="parentId" value={comment.id} />
        <input type="hidden" name="postId" value={postId} />

        <input type="hidden" name="userId" value={currentUserId} />
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
  )
}

export default CreateCommentReply
