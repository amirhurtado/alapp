"use server"

import { prisma } from "@/prisma"
import { uploadFile } from "../constants"



export const createGroupAction = async (formData : FormData) => {
    const currentuserId = formData.get("currentUserId") as string
    const name = formData.get("name") as string
     const description = await formData.get("description") as string
     const file = formData.get("imageGroup") as File

     
      const  imgUrl = await uploadFile(file, "/group")
     
     await prisma.group.create({
        data: {
            name,
            description,
            adminId: currentuserId,
            imageUrl: imgUrl
        }
     })
     return 
}