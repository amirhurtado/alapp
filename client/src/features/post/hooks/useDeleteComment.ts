import { deleteCommentAction } from "@/actions/comment/deleteComment";
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useDeleteComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({commendId} : {commendId: number}) => {
            return deleteCommentAction(commendId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["commentsReply"]})
            queryClient.invalidateQueries({queryKey: ["comments"]})

        }
    })
}