"use client"

import { useState } from "react"
import GroupTab from "./GroupTab"
import CreateGroup from "./CreateGroup/CreateGroup"

interface FullGroupViewProps {
    currentUserId: string
}


const FullGroupView = ({currentUserId} : FullGroupViewProps) => {
    const [selectSection, setSelectSection] = useState<"createGroup" | "exploreGroups">("createGroup")
  return (
    <div className="flex flex-col max-h-screen gap-8 p-4 overflow-y-auto">
      <GroupTab selectSection={selectSection} setSelectSection={setSelectSection}/>
      {selectSection === "createGroup" && <CreateGroup currentUserId={currentUserId} setSelectSection={setSelectSection} />}

    </div>
  )
}

export default FullGroupView
