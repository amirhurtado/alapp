import { getIARecommendation, getPostsAction } from "@/actions/post/getPost";
import { getUserbyNameAction } from "@/actions/user/getUser";
import FeedSection from "@/features/feed/components/FeedSection";
import { currentUser } from "@clerk/nextjs/server";

const page = async () => {
  const currUser = await currentUser();
  if (!currUser) return;

  const [userCurrentData, posts, IARecomendation] = await Promise.all([
    getUserbyNameAction(currUser.username!),
    getPostsAction(currUser.id, "exploreFeed"),
    getIARecommendation(currUser.id),
  ]);

  if (!userCurrentData) return;

  console.log(posts)

  const filteredPosts =
    IARecomendation?.post?.id
      ? posts.filter((p) => p.id !== IARecomendation.post!.id)
      : posts;

  console.log(filteredPosts)

  return (
    <div>
      <FeedSection
        posts={filteredPosts} 
        currentUser={{
          id: userCurrentData.id,
          imgUrl: userCurrentData.imageUrl,
        }}
        placement="exploreFeed"
        IARecomendation={IARecomendation}
      />
    </div>
  );
};

export default page;
