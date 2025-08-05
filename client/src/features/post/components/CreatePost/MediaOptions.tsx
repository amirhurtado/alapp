import { ImagePlus, Video, MapPinPlus, Smile } from "lucide-react";


interface MediaOptionsProps {
    fileInputId: string
    handleFileChange: (e : React.ChangeEvent<HTMLInputElement>) => void
}

const MediaOptions = ({fileInputId, handleFileChange} : MediaOptionsProps) => {
  return (
    <div className="flex gap-3 text-icon-blue">
      <div>
        <input
          type="file"
          id={fileInputId}
          className="hidden"
          accept="image/*,"
          onChange={handleFileChange}
          onClick={(e) => {
            e.currentTarget.value = "";
          }}
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
