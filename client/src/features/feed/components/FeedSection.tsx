import InfinitePosts from "@/features/post/components/InfinitePosts";
import CreatePost from "@/features/post/components/CreatePost/CreatePost";
import { FullPostType } from "@/types";
import FeedTab from "./FeedTab";

interface FeedSectionProps {
  posts: Array<FullPostType>;
  currentUserId: string;
  site: "main" | "explore"
}

const FeedSection = ({ posts, currentUserId, site }: FeedSectionProps) => {
  return (
    <div className="flex flex-col h-screen ">
      <FeedTab site={site} />
      <div className="flex flex-col max-h-screen  overflow-y-scroll ">
        {site === "main" &&   <CreatePost /> }
       
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
