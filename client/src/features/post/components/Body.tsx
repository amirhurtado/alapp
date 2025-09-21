"use client";
import { editPostAction } from "@/actions/post/editPost";
import CancelButton from "@/components/ui/CancelButton";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import PostMedia from "./PostMedia"; 
import { Smile } from "lucide-react"; 

import Picker, { Theme } from "emoji-picker-react";
import { useOnClickOutside } from "@/features/post/hooks/useOnClickOutside"; 

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

  // 3. Añadir el estado y la referencia para el picker
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // 4. Hook para cerrar el picker al hacer clic afuera
  useOnClickOutside(pickerRef, () => setShowEmojiPicker(false));

  // 5. Función para manejar la selección de un emoji
  const handleEmojiClick = (emojiObject: { emoji: string }) => {
    // Añade el emoji al texto existente (manejando el caso de que sea null)
    setEditValue((prev) => (prev || "") + emojiObject.emoji);
  };

  return (
    <div className="mt-1">
      {edit?.edit ? (
        <form
          className="relative flex flex-col gap-4" // Se cambió a gap-4 y se añadió relative
          action={async (formData) => {
            await editPostAction(formData);
            setShowEmojiPicker(false); // Ocultar picker al enviar
            router.back();
            queryClient.invalidateQueries({ queryKey: ["post"], exact: false });
            queryClient.invalidateQueries({ queryKey: ["postsFeed"], exact: false });
          }}
        >
          <input name="postId" type="hidden" value={edit.postId} />
          
          {/* Contenedor para el input y el ícono de emoji */}
          <div className="relative w-full">
            <input
              name="newDescription"
              value={editValue || ""} // Usamos 'value' en lugar de 'defaultValue' para controlarlo con el estado
              className="w-full bg-input text-[0.85rem] text-gray-300 border-1 border-border rounded-lg p-2 pr-10 resize-none focus:outline-none"
              placeholder="Edita tu descripción."
              onChange={(e) => setEditValue(e.target.value)}
            />
            {/* Ícono para abrir/cerrar el picker */}
            <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-color"
            >
                <Smile size={20} />
            </button>
          </div>
          
          {/* 6. Renderizado condicional del Picker */}
          {showEmojiPicker && (
              <div ref={pickerRef} className="absolute top-14 left-0 z-20">
                  <Picker
                      onEmojiClick={handleEmojiClick}
                      theme={Theme.DARK}
                      height={350}
                      width="100%"
                      searchDisabled
                      previewConfig={{ showPreview: false }}
                  />
              </div>
          )}

          <PostMedia mediaUrl={postMediaUrl} mediaType={postMediaType} />

          <div className="flex gap-2 justify-end mt-4">
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