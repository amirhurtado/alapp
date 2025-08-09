import React from 'react'
import { useFormStatus } from 'react-dom'

const SubmitButton = ({disabledSubmit} : {disabledSubmit: boolean}) => {
    const {pending} = useFormStatus();
  return (
    <button type="submit" disabled={disabledSubmit || pending} className={`mt-5 cursor-pointer text-start bg-icon-green py-1 px-3 max-w-max rounded-lg ${disabledSubmit && 'opacity-50'}`}>
        <p className="text-black">Guardar</p>
      </button>
  )
}

export default SubmitButton
