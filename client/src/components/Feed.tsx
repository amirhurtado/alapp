import { getPosts } from "@/actions/post";
import Post from "./Post";

const Feed = async () => {
  const posts = await getPosts();

  console.log("Posts fetched:", posts);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <Post post={post}/>
        </div>
      ))}
    </div>
  );
};

export default Feed;
