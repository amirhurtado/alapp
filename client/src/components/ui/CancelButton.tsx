import React from 'react'
import { useRouter } from 'next/navigation'

const CancelButton = () => {
    const router = useRouter();
  return (
    <button onClick={() => router.back()} className='max-w-max text-center cursor-pointer bg-red-400 py-1 px-3 rounded-lg text-md transition-transform active:scale-[0.95]'>
      Cancelar
    </button>
  )
}

export default CancelButton
