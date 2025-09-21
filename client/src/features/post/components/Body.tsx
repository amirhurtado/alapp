// PostBody.tsx
"use client";
import { editPostAction } from "@/actions/post/editPost";
import CancelButton from "@/components/ui/CancelButton";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PostMedia from "./PostMedia"; 

interface PostBodyProps {
  postDescription: string | null;
  postMediaUrl: string | null;
  postMediaType: string | null;
  edit?: {
    edit: boolean;
    postId: number;
  };
}

const PostBody = ({
  postDescription,
  postMediaUrl,
  postMediaType,
  edit,
}: PostBodyProps) => {
  const [editValue, setEditValue] = useState(postDescription);
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <div className="mt-1">
      {edit?.edit ? (
        <form
          className="flex flex-col gap-8"
          action={async (formData) => {
            await editPostAction(formData);
            router.back();
            queryClient.invalidateQueries({ queryKey: ["post"], exact: false });
            queryClient.invalidateQueries({ queryKey: ["postsFeed"], exact: false });
          }}
        >
          <input name="postId" type="hidden" value={edit.postId} />

          <input
            name="newDescription"
            defaultValue={editValue || ""}
            className="w-full bg-input text-[0.85rem] text-gray-300 border-1 border-border rounded-lg p-2 resize-none focus:outline-none "
            placeholder="Edita tu descripción."
            onChange={(e) => setEditValue(e.target.value)}
          />

          {/* AQUÍ USAMOS EL NUEVO COMPONENTE */}
          <PostMedia mediaUrl={postMediaUrl} mediaType={postMediaType} />

          <div className="flex gap-2 justify-end">
            <CancelButton />
            <SubmitButton
              text="editar"
              disabled={postDescription === editValue}
            />
          </div>
        </form>
      ) : (
        <>
          {postDescription && (
            <p className="text-[0.85rem] text-gray-300 whitespace-pre-wrap">
              {postDescription}
            </p>
          )}

          <PostMedia mediaUrl={postMediaUrl} mediaType={postMediaType} />
        </>
      )}
    </div>
  );
};

export default PostBody;