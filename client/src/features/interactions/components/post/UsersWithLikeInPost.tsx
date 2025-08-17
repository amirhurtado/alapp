import { getUserLikesInPostAction } from "@/actions/post/interactions";
import UserCard from "@/features/user/UserCard";
import { UserCardType } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useEffect, useRef } from "react";

interface UsersWithLikeInPostProps {
  userLikesInPost: UserCardType[];
  postId: number;
  currentUserId: string;
}

const UsersWithLikeInPost = ({
  userLikesInPost: initialUserLikesInPost,
  postId,
  currentUserId,
}: UsersWithLikeInPostProps) => {
  const queryKey = ["usersWithLikeInPost", postId];

  const loadmoreRef = useRef(null);


  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam = 1 }) => {
        return await getUserLikesInPostAction(currentUserId, postId, pageParam);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length + 1 : undefined;
      },
      initialData: {
        pages: [initialUserLikesInPost],
        pageParams: [1],
      },
    });

  const userLikesInPost =
    data.pages?.flatMap((page) => page) ?? initialUserLikesInPost;

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
    <div ref={loadmoreRef} className="mt-2 p-4 flex flex-col max-h-screen overflow-y-auto gap-3">
      {userLikesInPost.map((user, index) => (
        <div key={index}>
          <UserCard
            user={user}

            
          />
        </div>
      ))}

       {isFetchingNextPage && (
          <LoaderCircle
            className="animate-spin mx-auto text-primary-color "
            size={24}
          />
        )}

        {!hasNextPage && (
          <p className="text-center text-text-gray text-sm p-4">
            No hay más usuarios
          </p>
        )}
    </div>
  );
};

export default UsersWithLikeInPost;
