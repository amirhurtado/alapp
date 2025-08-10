import InfinitePosts from "@/features/post/components/InfinitePosts";
import CreatePost from "@/features/post/components/CreatePost/CreatePost";
import { FullPostType } from "@/types";
import FeedTab from "./FeedTab";

interface FeedSectionProps {
  posts: Array<FullPostType>;
  currentUserId: string;
}

const FeedSection = ({ posts, currentUserId }: FeedSectionProps) => {
  return (
    <div className="flex flex-col h-screen ">
      <FeedTab />
      <div className="flex flex-col max-h-screen  overflow-y-scroll ">
        <CreatePost />
        <InfinitePosts
          posts={posts}
          currentUserId={currentUserId}
          feed={true}
          userProfileId={currentUserId}
        />
      </div>
    </div>
  );
};

export default FeedSection;
