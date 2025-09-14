import FollowTab from "./FollowTab";
import InfiniteFollows from "./InfiniteFollows";
import { UserCardType } from "@/types";

interface FullFollowViewProps {
  query: "followings" | "followers";
  infoUserProfile: {
    username: string
    id: string
  }
  followings: UserCardType[]
}

const FullFollowView = ({
  query,
  infoUserProfile,
  followings
}: FullFollowViewProps) => {
  return (
    <div className="flex flex-col  overflow-y-hidden">
      <FollowTab type={query} usernameProfile={infoUserProfile.username} />
      <InfiniteFollows initialData={query === "followings" ? followings : []} type={query} userProfileId={infoUserProfile.id} />
    </div>
  );
};

export default FullFollowView;
