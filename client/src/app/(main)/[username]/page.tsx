import { currentUser } from "@clerk/nextjs/server";
import { getUserbyNameAction } from "@/actions/user";
import { getPostsAction } from "@/actions/post";
import HeaderProfiler from "@/features/profile/components/HeaderProfile";
import Feed from "@/features/post/components/InfinitePosts";
import BackNavigation from "@/components/ui/BackNavigation";

type Props = {
  params: {
    username: string;
  };
};

export default async function UserPage({ params }: Props) {
  const { username } = await params;

  const [currUser, userCurrentLog] = await Promise.all([
    currentUser(),
    getUserbyNameAction(username),
  ]);

  if (!userCurrentLog || !currUser) {
    return <h1>No encontrado</h1>;
  }

  const posts = await getPostsAction(userCurrentLog.id, false);

  const nameProfile = () => {
    if(currUser.id === userCurrentLog.id){
      return "Tu perfil"
    }else{
       return userCurrentLog.name
    }
  }

  return (
    <div className="h-screen flex flex-col overflow-x-hidden overflow-y-scroll ">
      <BackNavigation title={nameProfile()} subtitle={`${posts.length} posts`} />
      <HeaderProfiler
        userProfileInfo={userCurrentLog}
        currentUserId={currUser.id}
      />
      <Feed posts={posts} currentUserId={currUser.id} />
    </div>
  );
}
