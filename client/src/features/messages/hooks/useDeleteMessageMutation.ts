"use client"
import { deleteMessageAction } from "@/actions/messages/deleteMessage";
import { MessageType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query"

type oldData = {
    pages: MessageType[][]
}

export const useDeleteMessageMutation = (queryKey : unknown[]) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({messageId}: {messageId : number}) => {
            return deleteMessageAction(messageId)
        },
        onSuccess: async (response) => {
            const {newMessage} = response

            queryClient.invalidateQueries({queryKey: ["chatsWithConversation"]})

            if(!newMessage) return

            await queryClient.cancelQueries({queryKey: queryKey})

            queryClient.setQueryData(queryKey, (oldData : oldData ) => {
                if(!oldData) return

                return {
                    ...oldData,
                    pages: oldData.pages.map(page => 
                            page.map((message) => {
                                if(message.id === newMessage.id){
                                    return newMessage
                                }

                                return message
                            })
                    )
                }
            })

        }
    })
}