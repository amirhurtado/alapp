import { getFollowingsAction } from "@/actions/follow/follow";
import { getUserbyNameAction } from "@/actions/user/getUser";
import BackNavigation from "@/components/ui/BackNavigation";
import FullFollowView from "@/features/follows/FullFollowView";
import { currentUser } from "@clerk/nextjs/server";

type Props = {
  params: {
    username: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const FollowsPage = async ({ params, searchParams }: Props) => {

  const { username } = params;
  const query = searchParams?.query;
  const currUser = await currentUser(); 

  if (!currUser || !username) {
    return null; 
  }

  const [followings, infoUserProfile] = await Promise.all([
    getFollowingsAction(currUser.id),
    getUserbyNameAction(username),
  ]);

  if (!infoUserProfile) {
    return null; 
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <BackNavigation
        title="Follows"
        subtitle={
          username === currUser.username ? "Tú información" : "Su información"
        }
      />
      <FullFollowView
        // Nos aseguramos de que 'query' sea un string para evitar errores
        query={query === "followers" ? "followers" : "followings"}
        infoUserProfile={{
          username: infoUserProfile.name,
          id: infoUserProfile.id,
        }}
        followings={followings}
      />
    </div>
  );
};

export default FollowsPage;