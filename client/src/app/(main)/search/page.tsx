import { getUsersInSearchAction } from "@/actions/user/getUser";
import BackNavigation from "@/components/ui/BackNavigation";
import FullSearchView from "@/features/search/components/FullSearchView";
import { currentUser } from "@clerk/nextjs/server";

type Props = {
  searchParams: {
    query?: string;
  };
};

const page = async ({ searchParams }: Props) => {
  const [{ query }, currUser] = await Promise.all([searchParams, currentUser()]);

  if(!currUser) return

  const usersFind = await getUsersInSearchAction(query, currUser.id)


  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <BackNavigation title="Buscar" />

      <FullSearchView query={query} usersFind={usersFind} currentUserId={currUser.id}/>
    </div>
  );
};

export default page;
