import { ImagePlus, Video, MapPinPlus, Smile } from "lucide-react";

interface MediaOptionsProps {
  imageInputId: string;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageInputRef: React.RefObject<HTMLInputElement | null>;
  videoInputId: string;
  handleVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  videoInputRef: React.RefObject<HTMLInputElement | null>;
}

const MediaOptions = ({
  imageInputId,
  handleImageChange,
  imageInputRef,
  videoInputId,
  handleVideoChange,
  videoInputRef,
}: MediaOptionsProps) => {
  return (
    <div className="flex gap-3 text-primary-color">
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

      <MapPinPlus size={20} />
      <Smile size={20} />
    </div>
  );
};

export default MediaOptions;