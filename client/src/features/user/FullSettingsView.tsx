import React from 'react'
import { ChangePasswordForm } from './ChangePasswordForm'


interface FullSettingsViewProps{
    currentUserId: string

}

const FullSettingsView = ({currentUserId} : FullSettingsViewProps) => {
  return (
    <div className='p-4 flex flex-col max-h-screen overflow-y-auto  '>

        <ChangePasswordForm />
      
    </div>
  )
}

export default FullSettingsView
