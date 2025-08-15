import { currentUser } from "@clerk/nextjs/server";
import { getUserbyNameAction } from "@/actions/user";
import { getPostsAction } from "@/actions/post";
import HeaderProfiler from "@/features/profile/components/HeaderProfile";
import InfinitePosts from "@/features/feed/components/InfinitePosts";
import BackNavigation from "@/components/ui/BackNavigation";

type Props = {
  params: {
    username: string;
  };
};

export default async function UserPage({ params }: Props) {
  const { username } = await params;

  const [currUser, userProfile] = await Promise.all([
    currentUser(),
    getUserbyNameAction(username),

  ]);

  if (!userProfile || !currUser) {
    return <h1>No encontrado</h1>;
  }
  
  const posts = await getPostsAction(userProfile.id, "profile");

  const nameProfile = () => {
    if(currUser.id === userProfile.id){
      return "Tu perfil"
    }else{
       return userProfile.name
    }
  }

  return (
    <div className="h-screen flex flex-col overflow-x-hidden overflow-y-scroll ">
      <BackNavigation title={nameProfile()} subtitle={`${posts.length} posts`} />
      <HeaderProfiler
        userProfileInfo={userProfile}
        currentUserId={currUser.id}
      />
      <InfinitePosts posts={posts} currentUserId={currUser.id} userProfileId={userProfile.id} placement={"profile"} />
    </div>
  );
}
