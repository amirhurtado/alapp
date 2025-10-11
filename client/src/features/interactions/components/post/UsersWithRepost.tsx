import { getUserRepostsInPostAction } from "@/actions/post/interactions";
import LoadingAndEndMessage from "@/components/ui/LoadingAndEndMessage";
import UserCard from "@/features/user/UserCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

interface UsersWithRepostProps {
  postId: number;
  currentUserId: string;
}

const UsersWithRepost = ({
  postId,
  currentUserId,
}: UsersWithRepostProps) => {
  const queryKey = ["usersWithRepostInPost", postId];

  const loadmoreRef = useRef(null);


  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam = 1 }) => {
        return await getUserRepostsInPostAction(currentUserId, postId, pageParam);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length + 1 : undefined;
      },
      initialData: {
        pages: [],
        pageParams: [],
      },
    });

  const usersRepostInPost =
    data.pages?.flatMap((page) => page);

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
    <div ref={loadmoreRef} className="mt-2 p-4 flex flex-col max-h-[100dvh] overflow-y-auto gap-3">
      {usersRepostInPost.map((user, index) => (
        <div key={index}>
          <UserCard
            user={user}
            isMe={user.id === currentUserId}
          />
        </div>
      ))}

       <LoadingAndEndMessage isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} />
    </div>
  );
};

export default UsersWithRepost;
