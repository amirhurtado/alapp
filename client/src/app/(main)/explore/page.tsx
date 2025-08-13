import { getPostsAction } from "@/actions/post";
import { userExistsAction } from "@/actions/user";
import FeedSection from "@/features/feed/components/FeedSection";
import { currentUser } from "@clerk/nextjs/server";

const page = async () => {
  const currUser = await currentUser();

  if (!currUser) return;

  const [userData, posts] = await Promise.all([userExistsAction(currUser), getPostsAction(currUser.id, "exploreFeed")]);

  return (
    <div>
      <FeedSection posts={posts} currentUser={{id: userData.id, imgUrl: userData.imageUrl}} placement="exploreFeed" />
    </div>
  );
};

export default page;
