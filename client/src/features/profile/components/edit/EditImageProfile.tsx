import { Image as ImageKit } from "@imagekit/next";
import { SquarePen, Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

interface EditImageProfileProps {
  imageUrl: string;
  media: File | null;
  setMedia: React.Dispatch<React.SetStateAction<File | null>>;
}

const EditImageProfile = ({
  imageUrl,
  media,
  setMedia,
}: EditImageProfileProps) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setMedia(file);
    }
  };

  return (
    <div className="flex justify-center">
      <input
        onChange={handleImageChange}
        onClick={(e) => {
          e.currentTarget.value = "";
        }}
        name="newImageUrl"
        type="file"
        accept="image/*"
        id={"newImage"}
        className="hidden"
      />

      <div className="h-[4.5rem] w-[4.5rem] md:w-[6rem] md:h-[6rem]  relative group ">
        {media ? (
          <div>
            <Image
              src={URL.createObjectURL(media)}
              alt="preview"
              fill
              className="object-cover rounded-full"
            />
            <Trash
              className="absolute right-0 z-10 cursor-pointer bg-red-400 rounded-full p-2 w-[2rem] h-[2rem]"
              onClick={() => {
                setMedia(null);
              }}
            />
          </div>
        ) : (
          <label htmlFor={"newImage"} className="cursor-pointer">
            <ImageKit
              src={imageUrl}
              alt="foto de perfil"
              fill
              className="object-cover rounded-full opacity-45 group-hover:opacity-40 transition-all duration-200 ease-in"
            />
            <SquarePen
              strokeWidth={1}
              className="absolute h-[35%] w-[35%] transform top-1/2 -translate-y-[50%] left-1/2 translate-x-[-50%] group-hover:scale-[0.9] transition-transform duration-200 ease-in  "
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default EditImageProfile;
