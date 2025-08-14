import { getPostsAction } from "@/actions/post";
import { getUserbyNameAction } from "@/actions/user";
import FeedSection from "@/features/feed/components/FeedSection";
import { currentUser } from "@clerk/nextjs/server";

const page = async () => {
  const currUser = await currentUser();

  if (!currUser) return;

  const [userCurrentData, posts] = await Promise.all([getUserbyNameAction(currUser.username!), getPostsAction(currUser.id, "exploreFeed")]);

  if(!userCurrentData) return

  return (
    <div>
      <FeedSection posts={posts} currentUser={{id: userCurrentData.id, imgUrl: userCurrentData.imageUrl}} placement="exploreFeed" />
    </div>
  );
};

export default page;
