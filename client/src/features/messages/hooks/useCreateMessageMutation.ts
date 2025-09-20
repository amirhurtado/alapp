"use client"

import { createMessageAction } from "@/actions/messages/createMessages";
import { MessageType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query"



type oldDataType = {
    pages: MessageType[][]

}


export const useCreateMessageMutation = (queryKey: unknown[]) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({formData} : {formData: FormData}) => {
            return createMessageAction(formData)
        },
        onSuccess: (response) => {
            const {success, message} = response


            if(success){
                queryClient.setQueryData(queryKey, (oldData : oldDataType ) => {
                    console.log(oldData)
                    if(!oldData) return


                    return {
                        ...oldData,
                        pages: oldData.pages.map((page, index) => {
                            if(index === 0){
                                return [message, ...page]
                            }else
                                return page
                        })
                    }
                })
            }

            queryClient.setQueryData(["scrollFlag", queryKey], true);
        }
    })

}