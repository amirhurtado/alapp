"use server";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation"; 
import { userExistsAction } from "@/actions/user/createUser";
import { getPostsAction } from "@/actions/post/getPost";
import FeedSection from "@/features/feed/components/FeedSection";

export default async function Home() {
  const currUser = await currentUser();
  
  if (!currUser) {
    redirect('/sign-in'); // 👈 Redirige en vez de return vacío
  }
  
  const [userData, posts] = await Promise.all([
    userExistsAction(currUser),
    getPostsAction(currUser.id, "mainFeed"),
  ]);

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden">
      <FeedSection 
        posts={posts} 
        currentUser={{id: userData.id, imgUrl: userData.imageUrl}} 
        placement="mainFeed" 
      />
    </div>
  );
}