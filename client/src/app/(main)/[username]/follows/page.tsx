import BackNavigation from "@/components/ui/BackNavigation";
import FullFollowView from "@/features/follows/FullFollowView";
import { currentUser } from "@clerk/nextjs/server";

type Props = {
  params: {
    username: string;
  };
  searchParams: {
    query?: string;
  };
};

const page = async ({ params, searchParams }: Props) => {
  const [{ username }, { query }, currUser] = await Promise.all([
    params,
    searchParams,
    currentUser(),
  ]);

  if (!currUser) return;



  return (
    <div>
      <BackNavigation title="Follows" subtitle={username === currUser.username ? "Tú información" : "Su información"} />
      <FullFollowView query={query ?? "following"} currentUserId={currUser.id} />
    </div>
  );
};

export default page;
