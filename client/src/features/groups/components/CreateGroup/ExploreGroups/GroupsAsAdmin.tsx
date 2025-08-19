import React from 'react'
import GroupCard from '../GroupCard'
import { GroupCardType } from '@/types'

interface ExploreGroupsProps {
   groupsAsAdmin: GroupCardType[] 
}

const GroupsAsAdmin = ({ groupsAsAdmin }: ExploreGroupsProps) => {
  return (
    <div className="flex flex-col">
        <p className="text-sm text-text-gray ">Grupos que creaste</p>

        <div className="flex gap-2  w-full overflow-x-auto py-2">
          {groupsAsAdmin.map((group) => (
            <div key={group.id}>
              <GroupCard group={group} />
            </div>
          ))}
        </div>
      </div>
  )
}

export default GroupsAsAdmin
