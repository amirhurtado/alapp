import { userExistsAction } from "@/actions/user";
import FormEditProfile from "@/features/profile/edit/FormEditProfile";
import BackNavigation from "@/components/ui/BackNavigation";
import { currentUser } from "@clerk/nextjs/server";

const page = async () => {
  const currUser = await currentUser();
  if (!currUser) return;
  const userCurrent = await userExistsAction(currUser);

  return (
    <div className="h-screen overflow-y-scroll">
      <BackNavigation title="Editar información de perfil" />
      <FormEditProfile userCurrent={userCurrent} />
    </div>
  );
};

export default page;
