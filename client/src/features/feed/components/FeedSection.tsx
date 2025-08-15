import InfinitePosts from "@/features/feed/components/InfinitePosts";
import CreatePost from "@/features/post/components/CreatePost/CreatePost";
import { FullPostType } from "@/types";
import FeedTab from "./FeedTab";
import Recomendations from "@/features/recomendations/components/Recommendations";

interface FeedSectionProps {
  posts: Array<FullPostType>;
  currentUser: {
    id: string;
    imgUrl: string
  }
  placement: "mainFeed" | "exploreFeed";
}

const FeedSection = ({ posts, currentUser, placement }: FeedSectionProps) => {
  return (
    <div className="flex flex-col h-screen ">
      <FeedTab placement={placement} />

      <div className="flex flex-col max-h-screen  overflow-y-scroll ">
        {placement === "mainFeed" && <CreatePost currentUser={currentUser} />}

        {placement === "exploreFeed" && (
          <div className="h-full">
          <Recomendations currentUserId={currentUser.id} placement="explore" />


          </div>
        )}

        <InfinitePosts
          posts={posts}
          currentUserId={currentUser.id}
          userProfileId={currentUser.id}
          placement={placement}
        />
      </div>
    </div>
  );
};

export default FeedSection;
