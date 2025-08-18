import BackNavigation from '@/components/ui/BackNavigation'
import FullGroupView from '@/features/groups/components/FullGroupView'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const page = async () => {

    const [currUser] = await Promise.all([
        currentUser()
    ])

    if(!currUser) return
  return (
    <div className='flex flex-col h-screen'>
      <BackNavigation title='Grupos' />
      <FullGroupView currentUserId={currUser.id}/>
    </div>
  )
}

export default page
