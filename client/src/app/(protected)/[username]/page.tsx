"use server";

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

const UserPage = async ({ params }: Props) => {
  const username = params.username;

  const currUser = await currentUser();


  const user = await getUserbyName(username);
  if (!user) {
    return <h1>No encontrado</h1>;
  }
  const posts = await getPosts(user.id, false);

  return (
    <div className="h-screen flex flex-col overflow-hidden overflow-y-scroll">
      <ProfileHeader userInfo={user} currentUserName={currUser!.username!} />
      <Feed posts={posts} currentUserId={currUser!.id} />{" "}
    </div>
  );
};

export default UserPage;
