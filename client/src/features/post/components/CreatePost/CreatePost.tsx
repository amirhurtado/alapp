"use client";

import React, { useState, useId, useRef } from "react";
import Avatar from "@/components/ui/Avatar";
import { BadgeAlert } from "lucide-react";
import { SubmitButton } from "@/components/ui/SubmitButton";
import PreviewMedia from "./PreviewMedia";
import MediaOptions from "./MediaOptions";
import { useCreatePostMutation } from "../../hooks/useCreatePostMutation";
import Picker, { Theme } from "emoji-picker-react";
import { useOnClickOutside } from "@/features/post/hooks/useOnClickOutside";

interface CreatePostProps {
  modal?: boolean;
  currentUser: {
    id: string;
    imgUrl: string;
  };
}

interface MediaState {
  file: File;
  type: "image" | "video";
}

const CreatePost = ({ modal = false, currentUser }: CreatePostProps) => {
  const onCreate = useCreatePostMutation(currentUser.id);

  const [description, setDescription] = useState<string>("");
  const [media, setMedia] = useState<MediaState | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const imageInputId = useId();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputId = useId();
  const videoInputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(pickerRef, () => setShowEmojiPicker(false));

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (videoInputRef.current) videoInputRef.current.value = "";
      setMedia({ file, type: "image" });
    }
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (imageInputRef.current) imageInputRef.current.value = "";
      setMedia({ file, type: "video" });
    }
  };

  const removeMedia = () => {
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (videoInputRef.current) videoInputRef.current.value = "";
    setMedia(null);
  };

  const handleEmojiClick = (emojiObject: { emoji: string }) => {
    setDescription((prevDescription) => prevDescription + emojiObject.emoji);
  };

  // NUEVO: El manejador de cambios para la descripción
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = e.target.value;
    setDescription(newDescription);

    // Usamos una expresión regular para encontrar si el texto termina con un "@"
    // seguido de uno o más caracteres de palabra (letras, números, guion bajo).
    const mentionMatch = newDescription.match(/@(\w+)$/);

    if (mentionMatch) {
      // Si hay una coincidencia, `mentionMatch[0]` es "@texto" y `mentionMatch[1]` es solo "texto".
      const searchTerm = mentionMatch[1];
      console.log(`✅ Detectado @. Se buscará por: "${searchTerm}"`);
    }
  };

  return (
    <div className={`${!modal && "p-4 md:mt-2"}`}>
      <div className="relative flex w-full gap-3">
        {!modal && <Avatar src={currentUser.imgUrl || "user-default"} />}

        <form
          className="w-full"
          action={async (formData) => {
            onCreate.mutate({ formData });
            setDescription("");
            removeMedia();
          }}
        >
          <input
            type="hidden"
            readOnly
            name="authorId"
            value={currentUser.id}
          />

          <div>
            <div className="flex gap-4">
              {modal && <Avatar src={currentUser.imgUrl || "user-default"} />}
              <input
                className={`text-md md:text-lg placeholder:text-sm placeholder:md:text-lg placeholder-text-gray font-poppins w-full outline-none border-none ${
                  modal && "pb-12 mt-1"
                }`}
                value={description}
                // NUEVO: Usamos el nuevo manejador de cambios
                onChange={handleDescriptionChange}
                placeholder="Cuentanos lo que piensas!"
                type="text"
                name="description"
                // NUEVO: Desactivamos el autocompletado del navegador para que no interfiera
                autoComplete="off"
              />
            </div>

            <PreviewMedia media={media} onRemove={removeMedia} />
          </div>

          <div className="flex flex-col">
            <div className="text-primary-color flex items-center gap-1 mt-4 pl-1 border-b-2 border-border pb-4">
              <BadgeAlert size={16} />
              <p className="text-[.8rem] font-bold">Todos pueden responder</p>
            </div>

            <div className="flex justify-between items-center mt-6">
              <MediaOptions
                imageInputId={imageInputId}
                handleImageChange={handleImageChange}
                imageInputRef={imageInputRef}
                videoInputId={videoInputId}
                handleVideoChange={handleVideoChange}
                videoInputRef={videoInputRef}
                onSmileClick={() => setShowEmojiPicker(!showEmojiPicker)}
              />

              <SubmitButton
                disabled={!description && !media}
                text={"Publicar"}
              />
            </div>
          </div>
        </form>

        {showEmojiPicker && (
          <div ref={pickerRef} className="absolute top-full left-0 z-10 mt-2">
            <Picker
              onEmojiClick={handleEmojiClick}
              theme={Theme.DARK}
              height={300}
              width="100%"
              searchDisabled
              previewConfig={{
                showPreview: false,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePost;