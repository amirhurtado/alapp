import { userExistsAction } from "@/actions/user";
import FormEditProfile from "@/components/Profile/EditProfile/FormEditProfile";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const page = async () => {
  const currUser = await currentUser();
  if (!currUser) return;
  const userCurrentLog = await userExistsAction(currUser);

  return (
    <div className="h-screen overflow-y-scroll">
      <div className="bg-[#00000084] p-3 flex gap-9 items-center backdrop-blur-md z-10 sticky top-0 border-b-1 border-border">
        <Link href="/" aria-label="volver">
          <ArrowLeft size={20} className="cursor-pointer" />
        </Link>
        <p className="font-semibold text-md">Editar información de perfil</p>
      </div>

    <FormEditProfile userCurrentLog={userCurrentLog}  />

    </div>
  );
};

export default page;
