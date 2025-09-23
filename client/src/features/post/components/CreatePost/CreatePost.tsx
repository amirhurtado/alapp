"use client";

import React, { useState, useId, useRef, useCallback } from "react";
import Avatar from "@/components/ui/Avatar";
import { BadgeAlert } from "lucide-react";
import { SubmitButton } from "@/components/ui/SubmitButton";
import PreviewMedia from "./PreviewMedia";
import MediaOptions from "./MediaOptions";
import { useCreatePostMutation } from "../../hooks/useCreatePostMutation";
import Picker, { Theme } from "emoji-picker-react";
import { useOnClickOutside } from "@/features/post/hooks/useOnClickOutside";
import { debounce } from "lodash-es";
import { getMentionableUsersAction, MentionableUser } from "@/actions/user/getUser";
import MentionSuggestions from "./MentionSuggestions"; // Ajusta la ruta al componente de sugerencias

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

  const [mentionSuggestions, setMentionSuggestions] = useState<MentionableUser[]>([]);
  const [isMentionLoading, setIsMentionLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const imageInputId = useId();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputId = useId();
  const videoInputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const suggestionsContainerRef = useRef<HTMLDivElement>(null);

  // Hooks para cerrar popovers al hacer clic fuera
  useOnClickOutside(suggestionsContainerRef, () => setShowSuggestions(false));
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

  // Función debounced para llamar a la server action y buscar usuarios
  const debouncedFetchUsers = useCallback(
    debounce(async (searchTerm: string) => {
      setIsMentionLoading(true);
      const users = await getMentionableUsersAction(searchTerm, currentUser.id);
      setMentionSuggestions(users);
      setIsMentionLoading(false);
    }, 300),
    [currentUser.id]
  );

  // Manejador de cambios del input que activa la búsqueda de menciones
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = e.target.value;
    setDescription(newDescription);

    const mentionMatch = newDescription.match(/@(\w+)$/);
    if (mentionMatch) {
      const searchTerm = mentionMatch[1];
      setShowSuggestions(true);
      debouncedFetchUsers(searchTerm);
    } else {
      setShowSuggestions(false);
      setMentionSuggestions([]);
    }
  };

  // Manejador para cuando se selecciona un usuario de la lista
  const handleMentionSelect = (username: string) => {
    const newDescription = description.replace(/@(\w+)$/, `@${username} `);
    setDescription(newDescription);
    setShowSuggestions(false);
    setMentionSuggestions([]);
  };

  return (
    <div className={`${!modal && "p-4 md:mt-2"} relative`} ref={suggestionsContainerRef}>
      <div className="flex w-full gap-3">
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
                onChange={handleDescriptionChange}
                placeholder="Cuentanos lo que piensas!"
                type="text"
                name="description"
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
      </div>

      {/* Renderizado condicional del popover de sugerencias */}
      {showSuggestions && (
        <MentionSuggestions
          isLoading={isMentionLoading}
          suggestions={mentionSuggestions}
          onSelect={handleMentionSelect}
        />
      )}
      
      {/* Renderizado condicional del popover de emojis */}
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
  );
};

export default CreatePost;