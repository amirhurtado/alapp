import BackNavigation from "@/components/ui/BackNavigation";
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
    </div>
  );
};

export default page;
