import { getGroupsAsAdminAction } from '@/actions/group/getGroup'
import BackNavigation from '@/components/ui/BackNavigation'
import FullGroupView from '@/features/groups/components/FullGroupView'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const page = async () => {

    const [currUser] = await Promise.all([
        currentUser()
    ])

    if(!currUser) return


    const  [groupsAsAdmin] = await Promise.all([
        getGroupsAsAdminAction(currUser.id)
    ])

    console.log(groupsAsAdmin)
  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <BackNavigation title='Grupos' />
      <FullGroupView currentUserId={currUser.id} groupsAsAdmin={groupsAsAdmin}/>
    </div>
  )
}

export default page
