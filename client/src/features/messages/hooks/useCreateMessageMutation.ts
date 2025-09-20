"use client"

import { createMessageAction } from "@/actions/messages/createMessages";
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useCreateMessageMutation = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({formData} : {formData: FormData}) => {
            return createMessageAction(formData)
        },
        onSuccess: (response) => {
            const {success, message} = response


            console.log("HOLA", success, message)
        }
    })

}