import { getPostsLikedByUser } from "@/actions/post"
import { FullPostType } from "@/types"
import { useInfiniteQuery } from "@tanstack/react-query"

interface LikedPostsByUserProps{
    likePosts: FullPostType[],
    userIdInteraction : string
}
const LikedPostsByUser = ({likePosts : initialLikePosts, userIdInteraction} : LikedPostsByUserProps) => {

    const queryKey = ["likePosts", userIdInteraction]


    const {data, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
        queryKey,
        queryFn:  async ({pageParam = 1}) => {
            return getPostsLikedByUser(userIdInteraction, pageParam)
        },
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 10 ? allPages.length : undefined
        },
        initialPageParam: 1,
        initialData: {
            pages: [initialLikePosts],
            pageParams: [1]
        },
        staleTime: Infinity
    })

    const likePost = data.pages?.flatMap(page => page) ?? initialLikePosts

    
  return (
    <div>
      
    </div>
  )
}

export default LikedPostsByUser
