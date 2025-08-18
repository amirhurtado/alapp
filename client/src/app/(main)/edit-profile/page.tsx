import FormEditProfile from "@/features/user/profile/components/edit/FormEditProfile";
import BackNavigation from "@/components/ui/BackNavigation";
import { currentUser } from "@clerk/nextjs/server";
import { getUserbyNameAction } from "@/actions/user/getUser";
import { FullUserType } from "@/types";

const page = async () => {
  const currUser = await currentUser();

  if (!currUser) return;

  const infoUser = await getUserbyNameAction(currUser.username!)

  return (
    <div className="h-screen flex flex-col overflow-hidden ">
      <BackNavigation title="Editar información de perfil" />
      <FormEditProfile infoUser={infoUser as FullUserType}  />
    </div>
  );
};

export default page;
