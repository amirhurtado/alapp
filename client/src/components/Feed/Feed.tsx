import { FullPostType } from "@/types";
import Post from "./Post";
import Image from "next/image";

interface FeedProps {
  posts: Array<FullPostType>;
  currentUserId: string; 
}

const Feed = ({ posts, currentUserId  }: FeedProps) => {

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <Post post={post} currentUserId={currentUserId} />
        </div>
      ))}

      {posts.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-10">
          <Image
          src={'/ghost.webp'}
          alt="No posts"
          width={150}
          height={150}
          className="mx-auto mb-4"
          />
        <p className="text-text-gray font-poppins text-xs md:text-sm">Sigue a personas, o sube tu primer post.</p>


        </div>
      )}

    </div>
  );
};

export default Feed;
