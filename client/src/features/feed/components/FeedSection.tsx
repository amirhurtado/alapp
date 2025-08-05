import InfinitePosts from "@/features/post/components/InfinitePosts";
import CreatePost from "@/features/post/components/CreatePost/CreatePost";
import { FullPostType } from "@/types";
import FeedTab from "./FeedTab";

interface FeedSectionProps {
  posts: Array<FullPostType>;
  userCurrentId: string;
}

const FeedSection = ({ posts, userCurrentId }: FeedSectionProps) => {
  return (
    <div className="flex flex-col">
      <FeedTab />
      <div className="flex flex-col max-h-screen  overflow-y-scroll">
        <CreatePost />
        <InfinitePosts
          posts={posts}
          currentUserId={userCurrentId}
          feed={true}
        />
      </div>
    </div>
  );
};

export default FeedSection;
