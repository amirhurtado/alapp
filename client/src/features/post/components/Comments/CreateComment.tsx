"use client";
import Avatar from "@/components/ui/Avatar";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { useState } from "react";
import { useCreateCommentMutation } from "../../hooks/useCreateCommentMutation";

interface CreateCommentType {
  currentUser: {
    id: string;
    imgUrl: string;
  };

  postId: number;
}

const CreateComment = ({ currentUser, postId }: CreateCommentType) => {
  const [content, setContent] = useState<string>("");

  const onCreateComment = useCreateCommentMutation(postId);

  return (
    <form
      className="pt-4 pb-6 px-4 flex justify-between gap-3"
      action={ (formData) => {
        onCreateComment.mutate({ formData });
        setContent("");
      }}
    >
      <div className="flex gap-3 w-full">
        <Avatar src={currentUser.imgUrl} />
        <input type="hidden" value={postId} name="postId" />
        <input type="hidden" value={currentUser.id} name="userId" />
        <input
          type="text"
          className="outline-none  placeholder:font-poppins w-full border-none "
          placeholder="Deja tu comentario"
          name="content"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
      </div>
      <SubmitButton
        disabled={content === ""}
        text="Enviar"
        className="comment"
      />
    </form>
  );
};

export default CreateComment;
