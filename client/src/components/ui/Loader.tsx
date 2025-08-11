import { LoaderCircle } from 'lucide-react';
import React from 'react'

const Loader = () => {
  return (
    <div className="flex justify-center text-icon-green">
      <LoaderCircle size={20}  className="animate-spin"/>
    </div>
  )
}

export default Loader
