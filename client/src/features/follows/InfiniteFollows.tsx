"use client";
import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFollowersAction, getFollowingsAction } from "@/actions/follow/follow";
import UserCard from "../user/UserCard";
import { UserCardType } from "@/types";
import { LoaderCircle } from "lucide-react";

interface InfiniteFollowsProps {
  initialData: UserCardType[];
  type: "followings" | "followers";
  userProfileId: string;
}

const InfiniteFollows = ({
  initialData,
  type,
  userProfileId,
}: InfiniteFollowsProps) => {
  const queryKey = [type, { userId: userProfileId }];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam = 1 }) => {
        if (type === "followings") {
          return getFollowingsAction(userProfileId, pageParam);
        } else {
          return getFollowersAction(userProfileId, pageParam);
        }
      },
      getNextPageParam: (lastPage, allpages) => {
        return lastPage.length === 10 ? allpages.length + 1 : undefined;
      },
      initialPageParam: 1,
      initialData: {
        pageParams: [1],
        pages: [initialData],
      },
    });

  const follows = data.pages.flatMap((page) => page) ?? initialData;

  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col overflow-y-auto">
      <div className="flex flex-col">
        {follows.map((user, index) => (
          <div key={index}>
            <UserCard user={user} visitProfile={true}/>
          </div>
        ))}
      </div>
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
            No hay más usuarios
          </p>
        )}
      </div>
    </div>
  );
};

export default InfiniteFollows;
