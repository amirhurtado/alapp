"use client"

import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Search = () => {

  const [valueInput, setValueInput] = useState("")
  const router = useRouter();

  const handleSubmit = (e : React.ChangeEvent<HTMLFormElement>) => {
      console.log("VA A HACER EL PUSH")


    e.preventDefault()
    if(valueInput.trim() !== ""){
      router.push(`/search/${valueInput}`)

    }

  }


  return (
    <form onSubmit={handleSubmit} className='relative w-full'>
        <input 
        placeholder='Buscar...'
        onChange={(e) => setValueInput(e.target.value)}
        value={valueInput}
        className='w-full bg-input rounded-full py-2 px-4 text-text-gray placeholder:font-poppins pl-12 '
        />
        <SearchIcon size={16} className='absolute left-4 top-1/2 -translate-y-1/2 ' />
    </form>
  )
}

export default Search
