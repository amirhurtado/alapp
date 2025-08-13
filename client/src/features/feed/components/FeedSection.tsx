import InfinitePosts from "@/features/post/components/InfinitePosts";
import CreatePost from "@/features/post/components/CreatePost/CreatePost";
import { FullPostType } from "@/types";
import FeedTab from "./FeedTab";
import Recomendations from "@/features/recomendations/components/Recomendations";

interface FeedSectionProps {
  posts: Array<FullPostType>;
  currentUserId: string;
  feedSite: "main" | "explore" 
}

const FeedSection = ({ posts, currentUserId, feedSite }: FeedSectionProps) => {
  return (
    <div className="flex flex-col h-screen ">
      <FeedTab feedSite={feedSite} />
      <div className="flex flex-col max-h-screen  overflow-y-scroll ">
        {feedSite === "main" &&   <CreatePost /> }

        {feedSite === "explore" && <Recomendations currentUserId={currentUserId} placement="explore" /> }
       
        <InfinitePosts
          posts={posts}
          currentUserId={currentUserId}
          userProfileId={currentUserId}
          feedSite={feedSite}
        />

      
      </div>
    </div>
  );
};

export default FeedSection;
