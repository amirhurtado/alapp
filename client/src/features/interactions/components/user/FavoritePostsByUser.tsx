import { getPostsFavoriteByUserAction } from "@/actions/post";
import ShowInfinitePosts from "@/components/ShowInfinitePosts";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";

interface FavoritePostsByUserProps {
  userIdInteraction: string;
  currentUserId: string;
}

const FavoritePostsByUser = ({
  userIdInteraction,
  currentUserId,
}: FavoritePostsByUserProps) => {
  const queryKey = ["favoriteInPosts", { userId: userIdInteraction }];

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam = 1 }) => {
        return await getPostsFavoriteByUserAction(userIdInteraction, pageParam);
      },
      getNextPageParam: (lastPage, allpages) => {
        return lastPage.length === 10 ? allpages.length + 1 : undefined;
      },
      initialPageParam: 1,
      initialData: {
        pages: [],
        pageParams: [],
      },
    });

  const favoritePosts = data?.pages?.flatMap((page) => page) ?? [];

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col  overflow-y-auto">
      <ShowInfinitePosts
        currentUserId={currentUserId}
        posts={favoritePosts}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        queryKey={queryKey}
        loadMoreRef={loadMoreRef}
      />
    </div>
  );
};

export default FavoritePostsByUser;
