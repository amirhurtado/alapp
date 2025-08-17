'use client'

import React, { useEffect, useRef } from "react";
import SearchInput from "./SearchInput";
import { UserCardType } from "@/types";
import UserCard from "@/features/user/UserCard";
import LoadingAndEndMessage from "@/components/ui/LoadingAndEndMessage";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getUsersInSearchAction } from "@/actions/user/getUser";
import { useFollowMutation } from "@/features/user/profile/hooks/useFollowMutation";

interface FullSearchViewProps {
    query: string | undefined
    usersFind: UserCardType[]
    currentUserId: string
}

const FullSearchView = ({query, usersFind : initialUsersFind, currentUserId} : FullSearchViewProps) => {

  const queryKey = ["usersInSearch", {query: query}];

  const loadmoreRef = useRef(null);

  const followMutation = useFollowMutation()


  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam = 1 }) => {
        return await getUsersInSearchAction(query, currentUserId, pageParam);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length + 1 : undefined;
      },
      initialData: {
        pages: [initialUsersFind],
        pageParams: [1],
      },
      staleTime: Infinity
    });

  const usersFind = data.pages?.flatMap((page) => page) ?? initialUsersFind;

  useEffect(() => {
    if (!loadmoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loadmoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage]);

   
  return (
    <div className="p-4 flex flex-col max-h-screen gap-5">
      <SearchInput  />
      <div ref={loadmoreRef} className="mt-2 flex flex-col overflow-y-auto gap-3">
      {usersFind.map((user, index) => (
        <div key={index}>
          <UserCard
            user={user}
            onFollow={() => followMutation.mutate({currentUserId: currentUserId, userProfileId: user.id})}
          />
        </div>
      ))}

       <LoadingAndEndMessage isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
    </div>
    </div>
  );
};

export default FullSearchView;
