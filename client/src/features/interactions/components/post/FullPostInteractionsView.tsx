"use client"
import { useState } from "react"
import TabInteractions from "../InteractionsTab"

const FullPostInteractionsView = () => {
  const [selectInteraction,setSelectInteraction] = useState<"likes" | "reposts" | "favorites">("likes")


  return (
    <div>
      <TabInteractions selectInteraction={selectInteraction} setSelectInteraction={setSelectInteraction} />
      
    </div>
  )
}

export default FullPostInteractionsView
