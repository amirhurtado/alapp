"use client";

import { FullPostType } from "@/types";
import PostCard from "@/features/post/components/PostCard";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useLikeMutation } from "../hooks/useLikeMutation";

interface InfinitePostsProps {
  posts: Array<FullPostType>;
  currentUserId: string;
  feed?: boolean;
}

const InfinitePosts = ({
  posts: initialPosts,
  currentUserId,
  feed = false,
}: InfinitePostsProps) => {

      
  const queryKey = ["posts", currentUserId, feed]

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam = 1 }) => {
        const res = await fetch(
          `/api/posts?useridlog=${currentUserId}&feed=${feed}&page=${pageParam}`
        );
        return await res.json();
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length + 1 : undefined;
      },
      initialData: {
        pages: [initialPosts],
        pageParams: [1],
      },
    });

  const posts = data?.pages.flatMap((pages) => pages) ?? initialPosts;

  const likeMutation = useLikeMutation(queryKey);

  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  });

  return (
    <div className="flex flex-col  max-h-screen">
      {posts.map((post) => (
        <div key={post.id}>
          <PostCard post={post} currentUserId={currentUserId} onLike={() => likeMutation.mutate({postId : post.id, userId : currentUserId})} />
        </div>
      ))}

      <div
        ref={loadMoreRef}
        className="h-[2rem] flex items-center justify-center py-10"
      >
        {isFetchingNextPage && (
          <LoaderCircle
            className="animate-spin mx-auto text-primary-color "
            size={24}
          />
        )}
        {!hasNextPage && (
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
