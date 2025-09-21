import Avatar from '@/components/ui/Avatar'
import TimeAgo from '@/components/ui/TimeAgo'
import { FullPostType } from '@/types'
import React from 'react'
import PostBody from './Body'
import AuthorInfo from './AuthorInfo'

interface FullEditPostViewProps {
    post: FullPostType
}

const FullEditPostView = ({post}: FullEditPostViewProps) => {
  return (
    <div className="flex w-full gap-3 p-4">
        <Avatar src={post.author.imageUrl || "user-default"} />

        <div className="w-full">
          <div className="flex flex-col ">
            <div className="flex justify-between items-top  ">
              <div className="flex gap-1 items-center flex-1">
                <AuthorInfo
                  isMyPost={true}
                  author={{
                    name: post.author.name,
                    displayName: post.author.name,
                  }}
                />

                <div className="hidden md:block ">
                  <TimeAgo createdAt={post.createdAt} />
                </div>
              </div>

            </div>

            <div className="block md:hidden ">
              <TimeAgo createdAt={post.createdAt} />
            </div>
          </div>

          <PostBody
            postDescription={post.description}
            postMediaUrl={post.mediaUrl}
            postMediaType={post.mediaType}
            edit={{edit: true, postId: post.id}}
          />

          
        </div>
      </div>
  )
}

export default FullEditPostView
