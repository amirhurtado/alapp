"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getRecomentationsAction } from "@/actions/user";
import UserCardSidebar from "./components/UserCardSidebar";
import { LoaderCircle } from "lucide-react";
import { useFollowMutation } from "../profile/hooks/useFollowMutation";

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
  placement: "rightbar" | "explore"
}

const InfiniteRecommendations = ({
  initialRecommendations,
  currentUserId,
  placement
}: InfiniteRecommendationsProps) => {
  const queryKey = ["recommendations", currentUserId, placement];

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
  
    const followMutation = useFollowMutation();



  return (
    <div className="flex flex-col gap-2 overflow-y-scroll">
      {recomendations &&
        recomendations.map((user, index) => (
            <div key={index}>
                <UserCardSidebar user={user}  onFollow={() => followMutation.mutate({currentUserId, userProfileId: user.id})}  />
            </div>
        ))}

      {hasNextPage ? (
        <button onClick={() => fetchNextPage()} className="text-primary-color text-sm cursor-pointer text-start">Ver más</button>
      ) : 
      (
        <p  className="text-text-gray text-sm  text-start">No hay más recomendaciones</p>
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
