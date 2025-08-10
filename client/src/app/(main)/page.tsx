"use server";

import { currentUser } from "@clerk/nextjs/server";
import { userExistsAction } from "@/actions/user";
import SetUserClient from "@/components/SetUserClient";
import { getPostsAction } from "@/actions/post";
import FeedSection from "@/features/feed/components/FeedSection";

export default async function Home() {
  const currUser = await currentUser();

  if (!currUser) return;

  const [userCurrent, posts] = await Promise.all([
    userExistsAction(currUser),
    getPostsAction(currUser.id, true),
  ]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <SetUserClient dbUser={userCurrent} />

      <FeedSection posts={posts} currentUserId={userCurrent.id}  />
    </div>
  );
}
