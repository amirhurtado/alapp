"use client";

import { FullPostType } from "@/types";
import PostCard from "@/features/post/components/PostCard";
import { LoaderCircle } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import NoPost from "./NoPost";
import { useLikeMutation } from "../hooks/useLikeMutation";
import { useFavoriteMutation } from "../hooks/useFavoriteMutation";
import { useRepostMutation } from "../hooks/useRepostMutation";

interface InfinitePostsProps {
  posts: Array<FullPostType>;
  currentUserId: string;
  feed?: boolean;
  userProfileId: string;
}

const InfinitePosts = ({
  posts: initialPosts,
  currentUserId,
  feed = false,
  userProfileId,
}: InfinitePostsProps) => {

  const queryKey = ["posts", userProfileId, feed];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam = 1 }) => {
        const res = await fetch(
          `/api/posts?useridlog=${userProfileId}&feed=${feed}&page=${pageParam}`
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
      staleTime: Infinity,
    });

  const posts = data?.pages.flatMap((pages) => pages) ?? initialPosts;

  const likeMutation = useLikeMutation(queryKey);
  const favoriteMutation = useFavoriteMutation(queryKey);
  const repostMutation = useRepostMutation(queryKey);

  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col  max-h-screen">
      {posts.map((post) => (
        <div key={post.id}>
          <PostCard
            post={post}
            currentUserId={currentUserId}
            interactions={{
              onLike: () =>
                likeMutation.mutate({ postId: post.id, userId: currentUserId }),
              onFavorite: () =>
                favoriteMutation.mutate({
                  postId: post.id,
                  userId: currentUserId,
                }),
              onRepost: () =>
                repostMutation.mutate({
                  postId: post.id,
                  userId: currentUserId,
                }),
            }}
          />
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

      <NoPost postLength={posts.length} />
    </div>
  );
};

export default InfinitePosts;
