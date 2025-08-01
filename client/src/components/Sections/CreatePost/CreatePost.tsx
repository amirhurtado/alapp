"use client";

import React, { useState, useId } from "react";
import Image from "next/image";
import Avatar from "../../Avatar";
import {
  BadgeAlert,
  ImagePlus,
  Video,
  MapPinPlus,
  Smile,
  Trash,
} from "lucide-react";
import { createPostAction } from "@/actions/post";
import { useUser } from "@/store/useUser";
import { SubmitButton } from "./SubmitButton";

const CreatePost = ({ modal = false }: { modal?: boolean }) => {
  const { currentUser } = useUser();

  const [description, setDescription] = useState<string>("");
  const [media, setMedia] = useState<File | null>(null);
  const fileInputId = useId();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMedia(file);
    }
  };

  return (
    <div className={`${!modal && "p-4"}`}>
      <div className="flex w-full gap-3">
        {!modal && <Avatar src={currentUser?.imageUrl || 'user-default'} />}

        <form className="w-full" action={async (formData) =>{

          await createPostAction(formData);
          setDescription("");
          setMedia(null);

        }}>
          {currentUser?.id && <input type="hidden" name="authorId" value={currentUser?.id} /> }
          <div>
            <div className="flex gap-4">
              {modal && <Avatar src={currentUser?.imageUrl  || 'user-default'} />}

              <input
                className={`text-md md:text-lg placeholder-text-gray font-poppins w-full outline-none border-none ${
                  modal && "pb-12 mt-1"
                }`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Cuentanos lo que piensas!"
                type="text"
                name="description"
              />
            </div>

            {media && (
              <div className="relative">
                <Image
                  src={URL.createObjectURL(media)}
                  alt="Preview"
                  width={500}
                  height={500}
                  className="object-cover mt-4 border-1 border-border rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setMedia(null)}
                  className="absolute top-3 right-3 bg-red-400 rounded-lg px-2 py-1 cursor-pointer"
                >
                  <Trash size={20} className="text-white" />
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="text-icon-blue flex items-center gap-1 mt-2 pl-1 border-b-2 border-border pb-4">
              <BadgeAlert size={16} />
              <p className="text-[.8rem] font-bold">Todos pueden responder</p>
            </div>

            <div className="flex justify-between items-center mt-6">
              {/* post options */}
              <div className="flex gap-3 text-icon-blue">
                <div>
                  <input
                    type="file"
                    id={fileInputId}
                    className="hidden"
                    accept="image/*,"
                    onChange={handleFileChange}
                    name="image"
                  />
                  <label htmlFor={fileInputId} className="cursor-pointer">
                    <ImagePlus size={20} />
                  </label>
                </div>

                <Video size={20} />
                <MapPinPlus size={20} />
                <Smile size={20} />
              </div>

              <SubmitButton disabled={!description && !media} />

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
