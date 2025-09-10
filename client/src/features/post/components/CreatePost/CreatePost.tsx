"use client";

import React, { useState, useId, useRef } from "react";
import Avatar from "@/components/ui/Avatar";
import { BadgeAlert } from "lucide-react";
import { SubmitButton } from "@/components/ui/SubmitButton";
import PreviewMedia from "./PreviewMedia"; 
import MediaOptions from "./MediaOptions";
import { useCreatePostMutation } from "../../hooks/useCreatePostMutation";

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

  const imageInputId = useId();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputId = useId();
  const videoInputRef = useRef<HTMLInputElement>(null);

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
      // Limpiamos el otro input
      if (imageInputRef.current) imageInputRef.current.value = "";
      setMedia({ file, type: "video" });
    }
  };

  const removeMedia = () => {
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (videoInputRef.current) videoInputRef.current.value = "";
    setMedia(null);
  };

  return (
    <div className={`${!modal && "p-4 md:mt-2"}`}>
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
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Cuentanos lo que piensas!"
                type="text"
                name="description"
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
              />

              <SubmitButton
                disabled={!description && !media}
                text={"Publicar"}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;