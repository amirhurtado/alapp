import { ImagePlus, Video, Smile } from "lucide-react";

interface MediaOptionsProps {
  imageInputId: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageInputRef: React.RefObject<HTMLInputElement | null>;
  videoInputId: string;
  handleVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  videoInputRef: React.RefObject<HTMLInputElement | null>;
  onSmileClick: () => void; // <-- 1. AÑADIMOS LA NUEVA PROP
}

const MediaOptions = ({
  imageInputId,
  handleImageChange,
  imageInputRef,
  videoInputId,
  handleVideoChange,
  videoInputRef,
  onSmileClick, // <-- Recibimos la prop
}: MediaOptionsProps) => {
  return (
    <div className="flex gap-3 text-primary-color">
      {/* Input de Imagen (sin cambios) */}
      <div>
        <input
          type="file"
          id={imageInputId}
          className="hidden"
          accept="image/*"
          ref={imageInputRef}
          onChange={handleImageChange}
          name="image"
        />
        <label htmlFor={imageInputId} className="cursor-pointer">
          <ImagePlus size={20} />
        </label>
      </div>

      {/* Input de Video (sin cambios) */}
      <div>
        <input
          type="file"
          id={videoInputId}
          className="hidden"
          accept="video/*"
          ref={videoInputRef}
          onChange={handleVideoChange}
          name="video"
        />
        <label htmlFor={videoInputId} className="cursor-pointer">
          <Video size={20} />
        </label>
      </div>

      {/* 2. CONVERTIMOS EL ÍCONO EN UN BOTÓN */}
      <button type="button" onClick={onSmileClick} className="cursor-pointer">
        <Smile size={20} />
      </button>
    </div>
  );
};

export default MediaOptions;