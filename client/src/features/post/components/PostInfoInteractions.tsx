import { ChartLine } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


interface PostInfoInteractionsProps {
  authorName: string,
  postId: number
}

const PostInfoInteractions = ({authorName, postId} : PostInfoInteractionsProps) => {
  return (
    <Link href={`/${authorName}/post/${postId}/interactions`}>
      <ChartLine size={20} className='text-text-gray hover:text-primary-color transition-colors ease-in duration-200 cursor-pointer' />
    </Link>
  )
}

export default PostInfoInteractions
