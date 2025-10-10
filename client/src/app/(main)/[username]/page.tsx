import { currentUser } from "@clerk/nextjs/server";
import { getUserbyNameAction } from "@/actions/user/getUser";
import { getPostsAction } from "@/actions/post/getPost";
import HeaderProfiler from "@/features/user/profile/components/HeaderProfile";
import InfiniteFeed from "@/features/feed/components/InfiniteFeed";
import BackNavigation from "@/components/ui/BackNavigation";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function UserPage({ params }: Props) {
  const { username } = await params;

  const [currUser, userProfile] = await Promise.all([
    currentUser(),
    getUserbyNameAction(username),

  ]);

  if (!userProfile || !currUser) {
    return  notFound()
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
    <div className="h-screen flex flex-col overflow-x-hidden overflow-y-auto ">
      <BackNavigation title={nameProfile()} subtitle={`Aqui encuentras información personal`} />
      <HeaderProfiler
        userProfileInfo={userProfile}
        currentUserId={currUser.id}
      />
      <InfiniteFeed posts={posts} currentUserId={currUser.id} userProfileId={userProfile.id} placement={"profile"} />
    </div>
  );
}
