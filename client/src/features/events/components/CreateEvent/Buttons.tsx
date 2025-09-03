import { SubmitButton } from '@/components/ui/SubmitButton'
import { DialogClose } from '@radix-ui/react-dialog'
import React from 'react'

const Buttons = ({disabled} : {disabled: boolean}) => {
  return (
     <div className="flex gap-3">
        <DialogClose asChild>
          <button
            type="button"
            className="max-w-max text-center cursor-pointer bg-red-400 py-1 px-3 rounded-lg text-md transition-transform active:scale-[0.95]"
          >
            Cancelar
          </button>
        </DialogClose>

        <SubmitButton
          text="Crear evento"
          disabled={disabled}
          
        />
      </div>
  )
}

export default Buttons
