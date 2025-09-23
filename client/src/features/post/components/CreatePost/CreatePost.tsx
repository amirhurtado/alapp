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
import {
  getMentionableUsersAction,
  MentionableUser,
} from "@/actions/user/getUser";
import MentionSuggestions from "./MentionSuggestions";

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

interface MentionQuery {
  term: string;
  startIndex: number;
}

const CreatePost = ({ modal = false, currentUser }: CreatePostProps) => {
  const onCreate = useCreatePostMutation(currentUser.id);
  const [description, setDescription] = useState<string>("");
  const [media, setMedia] = useState<MediaState | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [mentionSuggestions, setMentionSuggestions] = useState<
    MentionableUser[]
  >([]);
  const [isMentionLoading, setIsMentionLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [mentionedUsers, setMentionedUsers] = useState<MentionableUser[]>([]);
  const [activeMention, setActiveMention] = useState<MentionQuery | null>(null);

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
    const cursorPosition = e.target.selectionStart || 0;
    const textUpToCursor = newDescription.substring(0, cursorPosition);
    const mentionMatch = textUpToCursor.match(/@(\w+)$/);

    if (mentionMatch) {
      const searchTerm = mentionMatch[1];
      const startIndex = mentionMatch.index || 0;
      setActiveMention({ term: searchTerm, startIndex });
      setShowSuggestions(true);
      debouncedFetchUsers(searchTerm);
    } else {
      setShowSuggestions(false);
      setActiveMention(null);
    }

    setDescription(newDescription);
  };

  const handleMentionSelect = (user: MentionableUser) => {
    if (!activeMention) return;
    setMentionedUsers((prev) => {
      if (prev.some((u) => u.id === user.id)) return prev;
      return [...prev, user];
    });
    const textBeforeMention = description.substring(
      0,
      activeMention.startIndex
    );
    const textAfterMention = description.substring(
      activeMention.startIndex + activeMention.term.length + 1
    );
    const newDescription = `${textBeforeMention}@${user.name} ${textAfterMention}`;
    setDescription(newDescription);
    setShowSuggestions(false);
    setMentionSuggestions([]);
    setActiveMention(null);
  };

  useEffect(() => {
    const usernamesInText = description.match(/@(\w+)/g) || [];
    const cleanUsernames = usernamesInText.map((u) => u.substring(1));
    setMentionedUsers((prev) =>
      prev.filter((user) => cleanUsernames.includes(user.name))
    );
  }, [description]);

  const renderStyledDescription = () => {
    if (!description) return null;
    const confirmedUsernames = new Set(mentionedUsers.map((u) => u.name));
    const parts = description.split(/(@\w+)/g);

    return parts.map((part, index) => {
      if (part.startsWith("@") && confirmedUsernames.has(part.substring(1))) {
        return (
          <span key={index} className="text-primary-color">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div
      className={`${!modal && "p-4 md:mt-2"} relative`}
      ref={suggestionsContainerRef}
    >
      <div className="flex w-full gap-3">
        {!modal && <Avatar src={currentUser.imgUrl || "user-default"} />}
        <form
          className="w-full"
          action={async (formData) => {
            const finalMentionedIds = mentionedUsers.map((u) => u.id).join(",");
            formData.append("mentionedUserIds", finalMentionedIds);
            onCreate.mutate({ formData });
            setDescription("");
            setMentionedUsers([]);
            removeMedia();
          }}
        >
          <input
            type="hidden"
            readOnly
            name="authorId"
            value={currentUser.id}
          />
          <input
            type="hidden"
            name="mentionedUserIds"
            value={mentionedUsers.map((u) => u.id).join(",")}
          />
          <div>
            <div className="flex gap-4">
              {modal && <Avatar src={currentUser.imgUrl || "user-default"} />}
              <div className="relative grid w-full items-center">
                
                {/* MODIFICADO: Capa del Placeholder (sólo visible si no hay texto) */}
                {!description && (
                   <div 
                     className="text-md md:text-lg text-gray-500 font-poppins [grid-area:1/1/2/2] pointer-events-none"
                     aria-hidden="true"
                   >
                     Cuentanos lo que piensas!
                   </div>
                )}
                
                {/* MODIFICADO: Capa Visual. Le añadimos `text-white` para el color por defecto */}
                <div
                  className="text-md md:text-lg font-poppins w-full outline-none border-none text-white [grid-area:1/1/2/2] whitespace-pre-wrap break-words p-0 m-0"
                  aria-hidden="true"
                >
                  {renderStyledDescription()}
                </div>

                {/* MODIFICADO: El Input real. Le quitamos el placeholder. */}
                <input
                  className="text-md md:text-lg font-poppins w-full outline-none border-none bg-transparent text-transparent caret-white [grid-area:1/1/2/2] p-0 m-0"
                  value={description}
                  onChange={handleDescriptionChange}
                  name="description"
                  autoComplete="off"
                />
              </div>
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