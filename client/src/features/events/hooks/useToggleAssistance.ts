import { toggleAssistanceEventAction } from "@/actions/event/toggleAssistanceEvent";
import { FullEventType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";


 type oldDataType = {
    pages: FullEventType[][];
 }

export const useToggleAssistance = (groupId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({eventId, userId}: {eventId: number, userId: string}) => {
            return toggleAssistanceEventAction(eventId, userId);
        },
        onMutate: async ({eventId, userId}) => {
            const queryKey = ['events', {groupId: groupId}];

            await queryClient.cancelQueries({queryKey});

            queryClient.setQueryData(queryKey, (oldData: oldDataType ) => {
                if (!oldData) return oldData;

                return {
                    ...oldData,
                    pages: oldData.pages.map(page => page.map(event => {
                        if(event.id === eventId){
                            const isConfirmed = event.usersConfirm.some(user => user.userId === userId);
                            return {
                                ...event,
                                usersConfirm: isConfirmed ? event.usersConfirm.filter(user => user.userId !== userId) : [...event.usersConfirm, {userId : userId}]
                            }
                        }
                    }))
                }
            })

        }
    })
        
}