import { Image } from "@imagekit/next";
import { SquarePen } from "lucide-react";

interface EditImageProfileProps {
  imageUrl: string;
}

const EditImageProfile = ({ imageUrl }: EditImageProfileProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-text-gray">Editar foto de perfil</p>

        <div className="h-[4.5rem] md:w-[6rem] md:h-[6rem]  relative group cursor-pointer">
          <Image
            src={imageUrl}
            alt="foto de perfil"
            fill
            className="object-cover rounded-full opacity-65 group-hover:opacity-60 transition-all duration-200 ease-in"
          />
        <SquarePen strokeWidth={1} className="absolute h-[45%] w-[45%] transform top-1/2 -translate-y-[50%] left-1/2 translate-x-[-50%] group-hover:scale-[0.9] transition-transform duration-200 ease-in  " />
        </div>

    </div>
  );
};

export default EditImageProfile;
