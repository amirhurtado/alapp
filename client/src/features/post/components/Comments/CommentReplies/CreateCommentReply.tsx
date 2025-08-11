'use client'
import { SubmitButton } from "@/components/ui/SubmitButton";
import { useCreateReplyCommentMutation } from "@/features/post/hooks/useCreateReplyCommentMutation"; 
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


  const onCreate = useCreateReplyCommentMutation(comment.id, postId);

  return (
     <form
        className="flex items-center gap-3 ml-[.4rem] max-w-full justify-between"
        action={ (formData) => {
           onCreate.mutate({formData})
           
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

        <SubmitButton disabled={content === ""} text="Responder" className="comment-xs" />
      </form>
  )
}

export default CreateCommentReply
