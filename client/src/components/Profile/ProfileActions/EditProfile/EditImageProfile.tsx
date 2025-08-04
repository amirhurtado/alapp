import { Image } from "@imagekit/next";
import { SquarePen } from "lucide-react";
import React, { useId, useState } from "react";

interface EditImageProfileProps {
  imageUrl: string;
}

const EditImageProfile = ({ imageUrl }: EditImageProfileProps) => {
  const id = useId();
  const [media, setMedia] = useState<null | File>(null);

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
        type="file"
        accept="image/*"
        id={id}
        className="hidden"
      />

      {media ? (
        <h1>Hay</h1>
      ) : (
        <label
          htmlFor={id}
          className="h-[4.5rem] w-[4.5rem] md:w-[6rem] md:h-[6rem]  relative group cursor-pointer"
        >
          <Image
            src={imageUrl}
            alt="foto de perfil"
            fill
            className="object-cover rounded-full opacity-65 group-hover:opacity-55 transition-all duration-200 ease-in"
          />
          <SquarePen
            strokeWidth={1}
            className="absolute h-[35%] w-[35%] transform top-1/2 -translate-y-[50%] left-1/2 translate-x-[-50%] group-hover:scale-[0.9] transition-transform duration-200 ease-in  "
          />
        </label>
      )}
    </div>
  );
};

export default EditImageProfile;
