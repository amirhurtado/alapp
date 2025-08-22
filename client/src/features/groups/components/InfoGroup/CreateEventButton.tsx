import { Plus } from 'lucide-react'
import React from 'react'

const CreateEventButton = ({disabled}: {disabled: boolean}) => {
  return (
    <div className={`bg-icon-green cursor-pointer ${disabled && "opacity-[0.8]"} text-black text-center rounded-lg w-full px-2 py-2  xxl:h-auto flex items-center gap-3`}>
          <Plus size={19} />
          <p className="hidden xxl:block ">Crear evento</p>
    </div>
  )
}

export default CreateEventButton
