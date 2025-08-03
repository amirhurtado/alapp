// app/[username]/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { getUserbyNameAction } from "@/actions/user";
import { getPostsAction } from "@/actions/post";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import Feed from "@/components/Feed/Feed";

type Props = {
  params: {
    username: string;
  };
};

export default async function UserPage({ params }: Props) {
  const { username } = await params;

  const [currUser, user] = await Promise.all([
    currentUser(),
    getUserbyNameAction(username),
  ]);

  if (!user || !currUser) {
    return <h1>No encontrado</h1>;
  }

  const posts = await getPostsAction(user.id, false);

  const ismyProfile = currUser.id === user.id;

  return (
    <div className="h-screen flex flex-col overflow-hidden overflow-y-scroll">
      <ProfileHeader
        userProfileInfo={user}
        currentUserIdLog={currUser.id}
        isMyProfile={ismyProfile}
      />
      <Feed posts={posts} currentUserIdLog={currUser.id} />
    </div>
  );
}
