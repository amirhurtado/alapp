import { SearchIcon } from 'lucide-react'
import React from 'react'

const Search = () => {
  return (
    <div className='relative w-full'>
        <input 
        placeholder='Buscar...'
        className='w-full bg-input rounded-full py-2 px-4 text-text-gray placeholder:font-poppins pl-12 '
        />
        <SearchIcon size={16} className='absolute left-4 top-1/2 -translate-y-1/2 ' />
    
      
    </div>
  )
}

export default Search
