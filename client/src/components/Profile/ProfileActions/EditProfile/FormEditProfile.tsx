'use client'

import { User as UserType } from "@/generated/prisma"
import EditImageProfile from "./EditImageProfile"
import EditInfoUser from "./EditInfoUser"

interface  FormEditProfile {
    userCurrentLog: UserType
}

const FormEditProfile = ({userCurrentLog} : FormEditProfile) => {
  return (
    <form className="flex flex-col p-4 gap-8 " action={async () => {

    }}>
        <EditImageProfile imageUrl={userCurrentLog.imageUrl} />
        <EditInfoUser  basicInfoUserCurrent={{name: userCurrentLog.name, displayName: userCurrentLog.displayName, email:userCurrentLog.email}}  />
        <button type="submit">Submit</button>

      
    </form>
  )
}

export default FormEditProfile
