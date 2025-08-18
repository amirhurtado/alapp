import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

interface ImageGroupProps {
  media: null | File;
  setMedia: React.Dispatch<React.SetStateAction<null | File>>;
  mediaRef: React.RefObject<HTMLInputElement | null>
}

const ImageGroup = ({ media, setMedia, mediaRef }: ImageGroupProps) => {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    

    if (file) {
      setMedia(file);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-text-gray">Imagen del grupo</p>

       <input
              type="File"
              className="hidden"
              name="imageGroup"
              onChange={handleFile}
              id="fileImageGroup"
              ref={mediaRef}
              accept="image/*"
            />

      <div className="h-[4.5rem] w-[4.5rem] md:w-[6rem] md:h-[6rem] rounded-lg   relative group bg-hover border-1 ">
        {!media ? (
          <>
         
           <label htmlFor="fileImageGroup" className="cursor-pointer w-full h-full flex justify-center items-center ">
            
           
            <Plus
              size={32}
              strokeWidth={1}
              className="group-hover:scale-[0.9] group-hover:opacity-[0.6]  transition-all duration-200 ease-in"
            />
            </label>
          </>
        ) : (
          <div className="h-full w-full relative">
          
          <Image 
          src={URL.createObjectURL(media)}
          alt="Image group"
          fill
          className="object-cover"
          />

          <Trash
              className="absolute right-0 z-10 cursor-pointer bg-red-400 rounded-full p-2 w-[2rem] h-[2rem]"
              onClick={() => {
                if (mediaRef.current) {
                  mediaRef.current.value = "";
                }
                setMedia(null);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGroup;
