import { ImagePlus, Video, MapPinPlus, Smile } from "lucide-react";


interface MediaOptionsProps {
    fileInputId: string
    handleFileChange: (e : React.ChangeEvent<HTMLInputElement>) => void
    inputImageRef: React.RefObject<HTMLInputElement | null>
}

const MediaOptions = ({fileInputId, handleFileChange, inputImageRef} : MediaOptionsProps) => {
  return (
    <div className="flex gap-3 text-primary-color">
      <div>
        <input
          type="file"
          id={fileInputId}
          className="hidden"
          accept="image/*,"
          ref={inputImageRef}
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
  );
};

export default MediaOptions;
