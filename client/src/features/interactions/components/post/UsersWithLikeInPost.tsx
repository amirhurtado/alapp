import { getUserLikesInPostAction } from "@/actions/post/interactions";
import { useInfiniteQuery } from "@tanstack/react-query";

interface UsersWithLikeInPostProps {
  userLikesInPost: {
    id: string;
    name: string;
    displayName: string;
    imageUrl: string;
  }[];
  postId: number
}

const UsersWithLikeInPost = ({userLikesInPost : initialUserLikesInPost, postId} : UsersWithLikeInPostProps) => {


  const queryKey = ["usersWithLikeInPost", postId]

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
    queryKey,
    queryFn: async ({pageParam = 1}) => {
      return await getUserLikesInPostAction(postId, pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length +1 : undefined
    },
    initialData: {
      pages: [initialUserLikesInPost],
      pageParams: [1]
    }
  })


  const userLikesInPost = data.pages?.map(page => page) ?? initialUserLikesInPost



  return (
    <div>
      
    </div>
  )
}

export default UsersWithLikeInPost
