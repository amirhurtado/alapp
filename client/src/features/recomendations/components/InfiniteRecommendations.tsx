"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getRecomentationsAction } from "@/actions/user/getUser";
import UserCard from "@/features/user/UserCard";
import { LoaderCircle } from "lucide-react";
import { useFollowMutation } from "@/features/user/profile/hooks/useFollowMutation"; 
import { InfoUserType } from "@/types";



interface InfiniteRecommendationsProps {
  initialRecommendations: InfoUserType[];
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
    <div className="flex flex-col gap-3 overflow-y-auto">
      {recomendations &&
        recomendations.map((user, index) => (
            <div key={index}>
                <UserCard user={user}  onFollow={() => followMutation.mutate({currentUserId, userProfileId: user.id})}  />
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
