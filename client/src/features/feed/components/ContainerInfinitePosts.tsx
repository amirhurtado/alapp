import PostCard from '@/features/post/components/PostCard'
import React from 'react'
import { LoaderCircle } from "lucide-react";
import { FullPostType } from '@/types';

interface ContainerInfinitePostsProps {
    currentUserId: string
    posts: FullPostType[]
    isFetchingNextPage: boolean,
    hasNextPage: boolean
    queryKey: unknown[]
    loadMoreRef: React.RefObject< HTMLDivElement| null>
}


const ContainerInfinitePosts = ({currentUserId, posts, isFetchingNextPage, hasNextPage, queryKey, loadMoreRef} : ContainerInfinitePostsProps) => {
  return (
    <div className='flex flex-col'>
        {posts.map((post) => (
        <div key={post.id}>
          <PostCard
            post={post}
            currentUserId={currentUserId}
            queryKey={queryKey}
          />
        </div>
      ))}

      <div
        ref={loadMoreRef}
        className="h-[2rem] flex items-center justify-center py-10"
      >
        {isFetchingNextPage && (
          <LoaderCircle
            className="animate-spin mx-auto text-primary-color "
            size={24}
          />
        )}
        {!hasNextPage && (
          <p className="text-center text-text-gray text-sm">
            No hay más publicaciones
          </p>
        )}
      </div>
      
    </div>
  )
}

export default ContainerInfinitePosts
