import { MessageType } from '@/types'
import React from 'react'


interface FullConversationViewProps {
  messages: MessageType[]
  infoOtherUser: {
    id: string
    username: string,
    displayName: string,
    imageUrl: string

  }
}

const FullConversationView = ({messages : initialMessages, infoOtherUser} : FullConversationViewProps) => {

  console.log(infoOtherUser, initialMessages)
  return (
    <div>
      
    </div>
  )
}

export default FullConversationView
