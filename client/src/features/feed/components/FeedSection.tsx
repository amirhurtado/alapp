import InfiniteFeed from "@/features/feed/components/InfiniteFeed";
import CreatePost from "@/features/post/components/CreatePost/CreatePost";
import { FullPostType } from "@/types";
import FeedTab from "./FeedTab";
import Recomendations from "@/features/recomendations/components/Recommendations";
import IARecommentation from "@/features/recomendations/components/IARecommendation";

interface FeedSectionProps {
  posts: Array<FullPostType>;
  currentUser: {
    id: string;
    imgUrl: string;
  };
  placement: "mainFeed" | "exploreFeed";
  IARecomendation?: {
    message: string,
    post?: FullPostType
  }
}

const FeedSection = ({ posts, currentUser, placement, IARecomendation }: FeedSectionProps) => {



  return (
    <div className="flex flex-col h-[100dvh]">
      <FeedTab placement={placement} />

      <div className="flex flex-col max-h-[100dvh] overflow-y-auto">
        {placement === "mainFeed" && <CreatePost currentUser={currentUser} />}

        {placement === "exploreFeed" && (
          <div className="h-full flex flex-col gap-4">
            <IARecommentation currentUserId={currentUser.id} iARecomendation={IARecomendation}  />
            <Recomendations
              currentUserId={currentUser.id}
              placement="explore"
            />
          </div>
        )}

        <InfiniteFeed
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
