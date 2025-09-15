import React from 'react'
import { ChangePasswordForm } from './ChangePasswordForm'
import DeleteAccount from './DeleteAccount'




const FullSettingsView = () => {
  return (
    <div className='p-4 flex flex-col max-h-screen overflow-y-auto  gap-8 md:gap-12   '>

        <ChangePasswordForm />
        <DeleteAccount />
      
    </div>
  )
}

export default FullSettingsView
