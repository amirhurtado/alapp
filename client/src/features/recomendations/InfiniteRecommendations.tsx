"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getRecomentationsAction } from "@/actions/user";
import UserCardRecommendation from "./components/UserCardRecommendation";
import { LoaderCircle } from "lucide-react";

type InfoUser = {
  id: string;
  name: string;
  displayName: string;
  imageUrl: string;
  isFriend: boolean,
};

interface InfiniteRecommendationsProps {
  initialRecommendations: InfoUser[];
  currentUserId: string;
}

const InfiniteRecommendations = ({
  initialRecommendations,
  currentUserId,
}: InfiniteRecommendationsProps) => {
  const queryKey = ["recommendations"];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({pageParam = []}) => {
        return await getRecomentationsAction(currentUserId, pageParam);
      },
      initialPageParam: [] as string[],
      getNextPageParam: (lastPage) => {
        const alreadyFetchedIds = lastPage.map(rec => rec.id)
        return lastPage.length === 3 ? alreadyFetchedIds : undefined;
      },
      initialData: {
        pages: [initialRecommendations],
        pageParams: [[]],
      },
      staleTime: Infinity
      
    });

  const recomendations =
    data.pages?.flatMap((page) => page) ?? initialRecommendations;

  return (
    <div className="flex flex-col gap-2">
      {recomendations &&
        recomendations.map((user, index) => (
            <div key={index}>
                <UserCardRecommendation user={user} currentUserId={currentUserId}  />
            </div>
        ))}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} className="text-primary-color text-sm cursor-pointer text-start">Ver más</button>
      )}
      {isFetchingNextPage && (
          <LoaderCircle
            className="animate-spin mx-auto text-primary-color "
            size={24}
          />
        )}
    </div>
  );
};

export default InfiniteRecommendations;
