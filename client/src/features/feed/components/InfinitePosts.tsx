"use client";

import { FullPostType } from "@/types";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import NoPost from "./NoPost";
import { getPostsAction } from "@/actions/post/getPost";
import ContainerInfinitePosts from "@/components/ContainerInfinitePosts";


interface InfinitePostsProps {
  posts: Array<FullPostType>;
  currentUserId: string;
  userProfileId: string;
  placement : "mainFeed" | "exploreFeed" | "profile"
}

const InfinitePosts = ({
  posts: initialPosts,
  currentUserId,
  userProfileId,
  placement,
}: InfinitePostsProps) => {

  const queryKey = ["posts", userProfileId, {placement: placement}];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam = 1 }) => {
        return getPostsAction(userProfileId, placement, pageParam )
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

  

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

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
      <ContainerInfinitePosts currentUserId={currentUserId} posts={posts} isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} queryKey={queryKey} loadMoreRef={loadMoreRef}/>

      <NoPost postLength={posts.length} />
    </div>
  );
};

export default InfinitePosts;
