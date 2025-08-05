import { currentUser } from "@clerk/nextjs/server";
import { getUserbyNameAction } from "@/actions/user";
import { getPostsAction } from "@/actions/post";
import HeaderProfiler from "@/features/profile/components/HeaderProfile";
import InfinitePosts from "@/features/post/components/InfinitePosts";
import BackNavigation from "@/components/ui/BackNavigation";

type Props = {
  params: {
    username: string;
  };
};

export default async function UserPage({ params }: Props) {
  const { username } = await params;

  const [currUser, userCurrent] = await Promise.all([
    currentUser(),
    getUserbyNameAction(username),
  ]);

  if (!userCurrent || !currUser) {
    return <h1>No encontrado</h1>;
  }

  const posts = await getPostsAction(userCurrent.id, false);

  const nameProfile = () => {
    if(currUser.id === userCurrent.id){
      return "Tu perfil"
    }else{
       return userCurrent.name
    }
  }

  return (
    <div className="h-screen flex flex-col overflow-x-hidden overflow-y-scroll ">
      <BackNavigation title={nameProfile()} subtitle={`${posts.length} posts`} />
      <HeaderProfiler
        userProfileInfo={userCurrent}
        currentUserId={currUser.id}
      />
      <InfinitePosts posts={posts} currentUserId={currUser.id} />
    </div>
  );
}
