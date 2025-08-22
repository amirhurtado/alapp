"use client"

import UserCard from '@/features/user/UserCard'
import { UserCardType } from '@/types'
import React, { useState } from 'react'

interface InfoMembersProps {
    members: {
        user: UserCardType
    }[],
    admin: UserCardType

}

const InfoMembers = ({members, admin} : InfoMembersProps ) => {
    const [filter, setFilter] = useState("")


   const membersFiltered = members.filter((member) => {
    return member.user.name.toLowerCase().includes(filter.toLowerCase())
   })


  return (
    <div className="flex flex-col gap-4">
        <div className="max-w-max">
          <p className="text-xs text-text-gray">Administrador:</p>

          <UserCard user={admin} />
        </div>
        <div className="max-w-max flex flex-col gap-2">
          <p className="text-xs text-text-gray">Miembros: {members.length}</p>

          <input type="text" placeholder='Buscar miembro' className='border-1 rounded-lg w-[12rem]  py-2 px-4 placeholder:text-xs text-xs bg-input' onChange={(e) => setFilter(e.target.value)} />

          <div className="w-full flex gap-4 overflow-x-auto overflow-y-hidden mt-2">
            {membersFiltered.map((member, index) => (
              <div key={index}>
                <UserCard user={member.user} />
              </div>
            ))}

            {membersFiltered.length === 0 && <p className='text-xs text-text-gray'>No hay coincidencias</p>}

          </div>
        </div>
      </div>
  )
}

export default InfoMembers
