import { getRecomentationsAction, getUsersInSearchAction } from "@/actions/user/getUser";
import BackNavigation from "@/components/ui/BackNavigation";
import FullSearchView from "@/features/search/components/FullSearchView";
import { InfoUserType } from "@/types";
import { currentUser } from "@clerk/nextjs/server";

type Props = {
  searchParams: Promise<{
    query?: string;
  }>;
};

const page = async ({ searchParams }: Props) => {
  const [{ query }, currUser] = await Promise.all([searchParams, currentUser()]);

  if(!currUser) return

  const usersFind = await getUsersInSearchAction(query, currUser.id)

  let recommendations: InfoUserType[] = [];

  if(!query){
    recommendations = await getRecomentationsAction(currUser.id, [])
  }else{

  }


  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <BackNavigation title="Buscar" />

      <FullSearchView query={query} usersFind={usersFind} currentUserId={currUser.id} recommendations={recommendations}/>
    </div>
  );
};

export default page;
