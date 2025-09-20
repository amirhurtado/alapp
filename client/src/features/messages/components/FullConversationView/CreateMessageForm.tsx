"use client"
import { Paperclip } from 'lucide-react'
import React, { useState } from 'react'
import { useCreateMessageMutation } from '../../hooks/useCreateMessageMutation'
import { SubmitButton } from '@/components/ui/SubmitButton'


interface CreateMessageFormProps{
  currentUserid: string
  otheruserId: string,
}

const CreateMessageForm = ({currentUserid, otheruserId } : CreateMessageFormProps) => {

  const [textContent, setTextContent] = useState("")


  const onSubmit = useCreateMessageMutation()

  return (
    <div className="flex bg-hover mb-4">
        <form className="p-4 flex gap-3 items-center justify-between w-full" action={async (formData) => {
          await onSubmit.mutate({formData})
        }}>
          <Paperclip size={22} />
          <input type="hidden" name="senderId"  value={currentUserid}/>
          <input type="hidden" name="receiverId"  value={otheruserId}/>

          <div className="flex flex-1 gap-2">
            <input
              name="content"
              onChange={(e) => setTextContent(e.target.value)}
              value={textContent}
              className="flex flex-1   outline-none border-none focus:ring-0 font-poppins"
              placeholder="Escribe un mensaje"
            />
            <SubmitButton disabled={textContent === ""} />

      

            
          </div>
        </form>
      </div>
  )
}

export default CreateMessageForm
