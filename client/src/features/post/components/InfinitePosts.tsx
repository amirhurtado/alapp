'use client'

import { FullPostType } from "@/types";
import PostCard from "@/features/post/components/PostCard";
import Image from "next/image";
import { useInfinitePost } from "../hooks/useInfinitePosts";
import { LoaderCircle } from "lucide-react";

interface InfinitePostsProps {
  posts: Array<FullPostType>;
  currentUserId: string;
  feed?: boolean; 
}

const InfinitePosts = ({ posts, currentUserId, feed = false }: InfinitePostsProps) => {
  const {data, hasMore, loadMoreRef} = useInfinitePost(currentUserId, posts, feed)

  return (
    <div className="flex flex-col">
      {data.map((post) => (
        <div key={post.id}>
          <PostCard post={post} currentUserId={currentUserId} />
        </div>
      ))}

      <div
        ref={loadMoreRef}
        className="h-[2rem] flex items-center justify-center my-8"
      >
        {hasMore ? (
          <LoaderCircle
            className="animate-spin mx-auto text-icon-blue "
            size={24}
          />
        ) : (
          <p className="text-center text-text-gray text-sm">
            No hay más publicaciones
          </p>
        )}
      </div>

      {posts.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-10">
          <Image
            src={"/ghost.webp"}
            alt="No posts"
            width={150}
            height={150}
            className="mx-auto mb-4"
          />
          <p className="text-text-gray font-poppins text-xs md:text-sm">
            Sigue a personas, o sube tu primer post.
          </p>
        </div>
      )}
    </div>
  );
};

export default InfinitePosts;
