"use client";

import React, { useState, useId } from "react"; 
import Image from "next/image";
import { Image as ImageKit } from "@imagekit/next";
import {
  BadgeAlert,
  ImagePlus,
  Video,
  MapPinPlus,
  Smile,
  Trash,
} from "lucide-react";
import { shareAction } from "@/actions";

const ImageProfile = () => {
  return (
    <div className="w-10 h-10 relative overflow-hidden rounded-full">
      <ImageKit
        src="/default-image.jpg"
        alt="Picture of the author"
        fill
        className="object-cover"
      />
    </div>
  );
};

const Share = ({ modal = false }: { modal?: boolean }) => {
  const [media, setMedia] = useState<File | null>(null);
  const fileInputId = useId(); 

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMedia(file);
      event.target.value = "";
    }
  };

  return (
    <div className={`${!modal && "p-4"}`}>
      <div className="flex w-full gap-3">
        {!modal && <ImageProfile />}

        <form className="w-full" action={shareAction}>
          <div>
            <div className="flex gap-4">
              {modal && <ImageProfile />}

              <input
                className={`text-md md:text-lg placeholder-text-gray font-poppins w-full outline-none border-none ${
                  modal && "pb-12 mt-1"
                }`}
                placeholder="Cuentanos lo que piensas!"
                type="text"
                name="text"
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

              <button
                type="submit"
                className="text-black cursor-pointer bg-icon-green py-1 px-3 rounded-xl  text-md"
              >
                Publicar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Share;