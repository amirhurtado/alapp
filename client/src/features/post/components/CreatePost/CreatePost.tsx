"use client";

import React, { useState, useId, useRef, useCallback, useEffect } from "react";
import Avatar from "@/components/ui/Avatar";
import { BadgeAlert } from "lucide-react";
import { SubmitButton } from "@/components/ui/SubmitButton";
import PreviewMedia from "./PreviewMedia";
import MediaOptions from "./MediaOptions";
import { useCreatePostMutation } from "../../hooks/useCreatePostMutation";
import Picker, { Theme } from "emoji-picker-react";
import { useOnClickOutside } from "@/features/post/hooks/useOnClickOutside";
import { debounce } from "lodash-es";
import { getMentionableUsersAction, MentionableUser } from "@/actions/user/getUser"; // Ajusta la ruta a tu action
import MentionSuggestions from "./MentionSuggestions"; // Ajusta la ruta a tu componente

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
  
  // Estado para guardar la lista de usuarios mencionados oficialmente.
  const [mentionedUsers, setMentionedUsers] = useState<MentionableUser[]>([]);

  const imageInputId = useId();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputId = useId();
  const videoInputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const suggestionsContainerRef = useRef<HTMLDivElement>(null);

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

  const debouncedFetchUsers = useCallback(
    debounce(async (searchTerm: string) => {
      setIsMentionLoading(true);
      const users = await getMentionableUsersAction(searchTerm, currentUser.id);
      setMentionSuggestions(users);
      setIsMentionLoading(false);
    }, 300),
    [currentUser.id]
  );

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

  const handleMentionSelect = (user: MentionableUser) => {
    setMentionedUsers((prev) => {
      if (prev.some(u => u.id === user.id)) {
        return prev;
      }
      const updatedUsers = [...prev, user];
      console.log(`✅ AÑADIDO: ${user.name}. IDs actuales:`, updatedUsers.map(u => u.id));
      return updatedUsers;
    });

    const newDescription = description.replace(/@(\w+)$/, `@${user.name} `);
    setDescription(newDescription);
    setShowSuggestions(false);
    setMentionSuggestions([]);
  };

  // Hook que sincroniza el estado `mentionedUsers` con el texto del input.
  useEffect(() => {
    const usernamesInText = description.match(/@(\w+)/g) || [];
    const cleanUsernames = usernamesInText.map(u => u.substring(1));

    setMentionedUsers((prev) => {
      const updatedMentions = prev.filter(user => cleanUsernames.includes(user.name));
      
      if (prev.length !== updatedMentions.length) {
        console.log(`❌ BORRADO. IDs actuales:`, updatedMentions.map(u => u.id));
      }
      
      return updatedMentions;
    });

  }, [description]);

  return (
    <div className={`${!modal && "p-4 md:mt-2"} relative`} ref={suggestionsContainerRef}>
      <div className="flex w-full gap-3">
        {!modal && <Avatar src={currentUser.imgUrl || "user-default"} />}
        <form
          className="w-full"
          action={async (formData) => {
            const finalMentionedIds = mentionedUsers.map(u => u.id).join(',');
            formData.append('mentionedUserIds', finalMentionedIds);
            console.log('ENVIANDO IDs:', finalMentionedIds);
            
            onCreate.mutate({ formData });
            setDescription("");
            setMentionedUsers([]);
            removeMedia();
          }}
        >
          <input type="hidden" readOnly name="authorId" value={currentUser.id}/>
          <div>
            <div className="flex gap-4">
              {modal && <Avatar src={currentUser.imgUrl || "user-default"} />}
              <input
                className={`text-md md:text-lg placeholder:text-sm placeholder:md:text-lg placeholder-text-gray font-poppins w-full outline-none border-none ${ modal && "pb-12 mt-1" }`}
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

      {showSuggestions && (
        <MentionSuggestions
          isLoading={isMentionLoading}
          suggestions={mentionSuggestions}
          onSelect={handleMentionSelect}
        />
      )}
      
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