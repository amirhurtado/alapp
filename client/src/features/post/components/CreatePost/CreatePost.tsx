"use client";

import React, { useState, useId, useRef } from "react";
import Avatar from "@/components/ui/Avatar";
import { BadgeAlert } from "lucide-react";
import { createPostAction } from "@/actions/post";
import { useUser } from "@/store/useUser";
import { SubmitButton } from "./SubmitButton";
import PreviewImage from "./PreviewImage";
import MediaOptions from "./MediaOptions";

const CreatePost = ({ modal = false }: { modal?: boolean }) => {
  const { currentUser } = useUser();

  const [description, setDescription] = useState<string>("");
  const [media, setMedia] = useState<File | null>(null);
  const fileInputId = useId();
  const inputImageRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMedia(file);
    }
  };

  return (
    <div className={`${!modal && "p-4 md:mt-2"}`}>
      <div className="flex w-full gap-3">
        {!modal && <Avatar src={currentUser?.imageUrl || "user-default"} />}

        <form
          className="w-full"
          action={async (formData) => {
            await createPostAction(formData);
            setDescription("");
            setMedia(null);
          }}
        >
          {currentUser?.id && (
            <input type="hidden" name="authorId" value={currentUser?.id} />
          )}
          <div>
            <div className="flex gap-4">
              {modal && (
                <Avatar src={currentUser?.imageUrl || "user-default"} />
              )}

              <input
                className={`text-md md:text-lg placeholder:text-sm placeholder:md:text-lg  placeholder-text-gray font-poppins w-full outline-none border-none ${
                  modal && "pb-12 mt-1"
                }`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Cuentanos lo que piensas!"
                type="text"
                name="description"
              />
            </div>

            <PreviewImage
              media={media}
              inputImageRef={inputImageRef}
              setMedia={setMedia}
            />
          </div>

          <div className="flex flex-col">
            <div className="text-primary-color flex items-center gap-1 mt-4 pl-1 border-b-2 border-border pb-4">
              <BadgeAlert size={16} />
              <p className="text-[.8rem] font-bold">Todos pueden responder</p>
            </div>

            <div className="flex justify-between items-center mt-6">
              {/* post options */}
              <MediaOptions
                fileInputId={fileInputId}
                handleFileChange={handleFileChange}
                inputImageRef={inputImageRef}
              />

              <SubmitButton disabled={!description && !media} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
