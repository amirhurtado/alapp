// app/[username]/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { getUserbyName } from "@/actions/user";
import { getPosts } from "@/actions/post";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import Feed from "@/components/Feed/Feed";

type Props = {
  params: {
    username: string;
  };
};

export default async function UserPage({ params }: Props) {
  const { username } = await params;

  const currUser = await currentUser();
  const user = await getUserbyName(username);

  if (!user || !currUser) {
    return <h1>No encontrado</h1>;
  }

  const posts = await getPosts(user.id, false);

  return (
    <div className="h-screen flex flex-col overflow-hidden overflow-y-scroll">
      <ProfileHeader
        userProfileInfo={user}
        currentUserId={currUser.id}
        currentUserName={currUser.username as string}
      />
      <Feed posts={posts} currentUserId={currUser.id} />
    </div>
  );
}
