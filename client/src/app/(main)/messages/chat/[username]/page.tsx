import BackNavigation from '@/components/ui/BackNavigation'
import React from 'react'

type Props = {
    params: {
        username: string
    }
}

const page =  async ({params} : Props) => {

    const [{username}] = await Promise.all ([
        params
    ])


  return (
    <div>
      <BackNavigation title={`Chat con ${username}` } subtitle='Sé amable'/>
      
    </div>
  )
}

export default page
