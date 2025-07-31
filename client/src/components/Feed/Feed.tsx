import { FullPostType } from "@/types";
import Post from "./Post";

interface FeedProps {
  posts: Array<FullPostType>;
}

const Feed = async ({ posts }: FeedProps) => {

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};

export default Feed;
