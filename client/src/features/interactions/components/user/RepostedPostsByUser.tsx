import {  getPostsRepostedByUserAction } from "@/actions/post/getPost"
import ContainerInfinitePosts from "@/features/post/components/ContainerInfinitePosts"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect, useRef } from "react"

interface RepostedPostsByUserProps{
    userIdInteraction : string
    currentUserId : string
}
const RepostedPostsByUser = ({ userIdInteraction, currentUserId} : RepostedPostsByUserProps) => {

    const queryKey = ["repostedInPosts", {userId: userIdInteraction}]

    const loadMoreRef = useRef<HTMLDivElement | null>(null)

    const {data, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
        queryKey,
        queryFn:  async ({pageParam = 1}) => {
            return getPostsRepostedByUserAction(userIdInteraction, pageParam)
        },
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 10 ? allPages.length + 1 : undefined
        },
        initialPageParam: 1,
        initialData: {
            pages: [],
            pageParams: []
        },
    })

    const repostedPosts = data.pages?.flatMap(page => page) 

    useEffect(() => {

        if(!loadMoreRef.current || !hasNextPage) return
        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting){
                fetchNextPage()
            }
        })

        observer.observe(loadMoreRef.current);

        return () => {
            observer.disconnect()
        }

    }, [hasNextPage, fetchNextPage])

    
  return (
    <div className="flex flex-col  overflow-y-auto">
        <ContainerInfinitePosts  currentUserId={currentUserId} posts={repostedPosts} isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} queryKey={queryKey} loadMoreRef={loadMoreRef} />
    </div>
  )
}

export default RepostedPostsByUser
