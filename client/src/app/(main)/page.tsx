"use server";

import { currentUser } from "@clerk/nextjs/server";
import { userExistsAction } from "@/actions/user";
import { getPostsAction } from "@/actions/post/getPost";
import FeedSection from "@/features/feed/components/FeedSection";

export default async function Home() {
  const currUser = await currentUser();

  if (!currUser) return;

  const [userData, posts] = await Promise.all([
    userExistsAction(currUser),
    getPostsAction(currUser.id, "mainFeed"),
  ]);
  return (
    <div className="h-screen flex flex-col overflow-hidden">

      <FeedSection posts={posts} currentUser={{id: userData.id, imgUrl: userData.imageUrl}} placement="mainFeed"  />
    </div>
  );
}
