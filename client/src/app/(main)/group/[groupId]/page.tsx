import React from 'react'

type Props = {
    params: {
        groupId: string
    }
}

const page = async ({params} : Props) => {

    const [groupId] = await Promise.all([params.groupId])
    console.log(groupId)

  return (
    <div>
      
    </div>
  )
}

export default page
