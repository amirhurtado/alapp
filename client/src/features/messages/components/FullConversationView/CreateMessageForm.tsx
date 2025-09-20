"use client";
import { Paperclip, Trash } from "lucide-react";
import React, { useRef, useState } from "react";
import { useCreateMessageMutation } from "../../hooks/useCreateMessageMutation";
import { SubmitButton } from "@/components/ui/SubmitButton";
import Image from "next/image";

interface CreateMessageFormProps {
  currentUserid: string;
  otheruserId: string;
  queryKey: unknown[];
}

const CreateMessageForm = ({
  currentUserid,
  otheruserId,
  queryKey,
}: CreateMessageFormProps) => {
  const [textContent, setTextContent] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const mediaRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = useCreateMessageMutation(queryKey);

  const handleMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setMedia(file);
    }
  };

  return (
    <div className="flex bg-hover mb-4">
      <form
        className="p-4 flex gap-3 items-center justify-between w-full"
        action={async (formData) => {
          await onSubmit.mutate({ formData });
          setTextContent("");
          setMedia(null);
        }}
      >
        <input
          type="file"
          name="media"
          accept="image/*"
          id="imageInConversation"
          className="hidden"
          onChange={handleMedia}
          ref={mediaRef}
        />

        {!media ? (
          <label htmlFor="imageInConversation" className="cursor-pointer">
            {" "}
            <Paperclip size={22} />
          </label>
        ) : (
          <div className="relative">
            <Image
              src={URL.createObjectURL(media)}
              alt="Image"
              width={40}
              height={40}
            />
            <div className="absolute top-[-.7rem] right-[-.5rem] bg-red-400 p-[.2rem] rounded-lg cursor-pointer">
              <Trash
                size={14}
                onClick={() => {
                  if (mediaRef.current) {
                    mediaRef.current.value = "";
                  }
                  setMedia(null);
                }}
              />
            </div>
          </div>
        )}

        <input type="hidden" name="senderId" value={currentUserid} />
        <input type="hidden" name="receiverId" value={otheruserId} />

        <div className="flex flex-1 gap-2">
          <input
            name="content"
            onChange={(e) => setTextContent(e.target.value)}
            value={textContent}
            className="flex flex-1   outline-none border-none focus:ring-0 font-poppins"
            placeholder="Escribe un mensaje"
          />
          <SubmitButton disabled={textContent === "" && !media} />
        </div>
      </form>
    </div>
  );
};

export default CreateMessageForm;
