import Image from "next/image";

import { Trash } from "lucide-react";
import React from "react";

interface PreviewImageProps {
  media: File | null;
  inputImageRef: React.RefObject<HTMLInputElement | null>;
  setMedia: React.Dispatch<React.SetStateAction<File | null>>
}

const PreviewImage = ({ media, inputImageRef, setMedia }: PreviewImageProps) => {
  return (
    <>
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
            aria-label="Eliminar imagen"
            onClick={() => {
              if (inputImageRef.current) {
                inputImageRef.current.value = "";
              }
              setMedia(null)
            }}
            className="absolute top-3 right-3 bg-red-400 rounded-lg px-2 py-1 cursor-pointer"
          >
            <Trash size={20} className="text-white" />
          </button>
        </div>
      )}
    </>
  );
};

export default PreviewImage;
