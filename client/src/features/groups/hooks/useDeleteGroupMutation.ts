import { deleteGroupAction } from "@/actions/group/deleteGroup";
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useDeleteGroupMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({groupId} : {groupId: number}) => {
            return deleteGroupAction(groupId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["groupRecommendations"]})

        }
    })
}