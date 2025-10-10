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
    query?: "followings" | "followers";
  };
};

const page = async ({ params, searchParams }: Props) => {
  const [{ username }, { query }, currUser] = await Promise.all([
    params,
    searchParams,
    currentUser(),
  ]);

  if (!currUser || !username) return;

  const [followings, infoUserProfile] = await Promise.all([
    getFollowingsAction(currUser.id),
    getUserbyNameAction(username),
  ]);

  if (!infoUserProfile) return;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <BackNavigation
        title="Follows"
        subtitle={
          username === currUser.username ? "Tú información" : "Su información"
        }
      />
      <FullFollowView
        query={query ?? "followings"}
        infoUserProfile={{
          username: infoUserProfile.name,
          id: infoUserProfile.id,
        }}
        followings={followings}
      />
    </div>
  );
};

export default page;
