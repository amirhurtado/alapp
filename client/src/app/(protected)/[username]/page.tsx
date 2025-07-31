"use server";

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

  const user = await getUserbyName(username);
  if (!user) {
    return <h1>No encontrado</h1>;
  }
  const posts = await getPosts(user.id, false);

  return (
    <div className="h-screen flex flex-col overflow-hidden overflow-y-scroll">
      <ProfileHeader userInfo={user} />
      <Feed posts={posts} />{" "}
    </div>
  );
};

export default UserPage;
