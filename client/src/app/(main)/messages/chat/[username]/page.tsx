import { getMessagesWithUserAction } from '@/actions/messages/getMessages'
import { getUserbyNameAction } from '@/actions/user/getUser'
import BackNavigation from '@/components/ui/BackNavigation'
import FullConversationView from '@/features/messages/components/FullConversationView'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

type Props = {
    params: {
        username: string
    }
}

const page =  async ({params} : Props) => {

    const [currUser,{username}] = await Promise.all ([
      currentUser(),
        params,
    ])

    if(!currUser) return

    const [messages, infoOtherUser] = await Promise.all ([
      getMessagesWithUserAction(currUser.id, username),
      getUserbyNameAction(username)
    ]) 

    if(!infoOtherUser) return


  return (
    <div>
      <BackNavigation title={`Chat con ${username}` } subtitle='Sé amable'/>
      <FullConversationView  messages={messages} infoOtherUser={{id:infoOtherUser.id, username: infoOtherUser.name, displayName: infoOtherUser.displayName, imageUrl: infoOtherUser.imageUrl}}/>
      
    </div>
  )
}

export default page
