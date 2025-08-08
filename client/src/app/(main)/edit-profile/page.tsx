import { getInfoProfileAction, userExistsAction } from "@/actions/user";
import FormEditProfile from "@/features/profile/components/edit/FormEditProfile";
import BackNavigation from "@/components/ui/BackNavigation";
import { currentUser } from "@clerk/nextjs/server";

const page = async () => {
  const currUser = await currentUser();
  if (!currUser) return;

  const [userCurrent, infoProfile] = await Promise.all([
     userExistsAction(currUser),
    getInfoProfileAction(currUser.id)
  ])


  return (
    <div className="h-screen overflow-y-scroll">
      <BackNavigation title="Editar información de perfil" />
      <FormEditProfile userCurrent={userCurrent} infoProfile={infoProfile} />
    </div>
  );
};

export default page;
