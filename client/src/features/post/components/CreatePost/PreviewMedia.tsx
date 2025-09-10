import Image from "next/image";
import { Trash } from "lucide-react";
import React, { useMemo, useEffect } from "react"; 

interface MediaPreview {
  file: File;
  type: "image" | "video";
}

interface PreviewMediaProps {
  media: MediaPreview | null;
  onRemove: () => void;
}

const PreviewMedia = ({ media, onRemove }: PreviewMediaProps) => {
  const mediaUrl = useMemo(() => {
    if (media?.file) {
      return URL.createObjectURL(media.file);
    }
    return null;
  }, [media?.file]);


  useEffect(() => {
    return () => {
      if (mediaUrl) {
        URL.revokeObjectURL(mediaUrl);
      }
    };
  }, [mediaUrl]);

  if (!mediaUrl || !media) {
    return null;
  }

  return (
    <div className="relative mt-4">
      {media.type === "image" && (
        <Image
          src={mediaUrl} 
          alt="Preview"
          width={500}
          height={500}
          className="object-cover border-1 border-border rounded-xl"
        />
      )}

      {media.type === "video" && (
        <video
          src={mediaUrl}
          controls
          className="w-full border-1 border-border rounded-xl"
        />
      )}

      <button
        type="button"
        aria-label="Eliminar archivo"
        onClick={onRemove}
        className="absolute top-3 right-3 bg-red-400 rounded-lg px-2 py-1 cursor-pointer"
      >
        <Trash size={20} className="text-white" />
      </button>
    </div>
  );
};

export default PreviewMedia;