import { FullPostType } from "@/types";
import Post from "./Post";

interface FeedProps {
  posts: Array<FullPostType>;
  currentUserId: string; 
}

const Feed = ({ posts, currentUserId }: FeedProps) => {

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <Post post={post} currentUserId={currentUserId} />
        </div>
      ))}
    </div>
  );
};

export default Feed;
