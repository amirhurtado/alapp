import { getGroupsRecommendationAction } from "@/actions/group/getGroup";
import { GroupCardType } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import GroupCard from "../../CreateGroup/GroupCard";
import { useEffect, useRef } from "react";

interface GroupsRecommendationsProps {
  currentUserId: string;
  groupRecommendations: GroupCardType[];
}

const GroupsRecommendations = ({
  currentUserId,
  groupRecommendations: initialGroupRecommendations,
}: GroupsRecommendationsProps) => {
  const queryKey = ["groupRecommendations", { site: "explore" }];

  const loadMore = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam = 1 }) => {
        return await getGroupsRecommendationAction(currentUserId, pageParam);
      },
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 3 ? allPages.length + 1 : undefined;
      },
      initialPageParam: 1,
      initialData: {
        pages: [initialGroupRecommendations],
        pageParams: [1],
      },
    });

  const groupsrecommendations =
    data.pages?.flatMap((page) => page) ?? initialGroupRecommendations;

  useEffect(() => {
    if (!loadMore.current || !hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loadMore.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className="w-full pl-2">

      <p className="text-xs text-text-gray mt-2">Algunas recomendaciones</p>
      <div className="flex gap-2  w-full overflow-x-auto py-2 items-center pb-4">
        {groupsrecommendations.map((group) => (
          <div key={group.id}>
            <GroupCard group={group} />
          </div>
        ))}
        {isFetchingNextPage && (
        <LoaderCircle
          className="animate-spin mx-auto text-primary-color min-w-[1.5rem] min-h-[1.5rem]"
        />
      )}
      <div ref={loadMore} className=" shrink-0 w-[2rem]"></div>

      </div>
      {groupsrecommendations.length === 0 && (
        <p className="text-xs text-text-gray">No hay recomendaciones</p>
      )}
    </div>
  );
};

export default GroupsRecommendations;
