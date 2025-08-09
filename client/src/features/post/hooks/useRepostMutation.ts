import { toggleRepostAction } from "@/actions/post";
import { FullPostType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useRepostMutation = (queryKey: any[]) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({postId, userId} : {postId: number, userId: string}) => {
            return toggleRepostAction(postId, userId)
        },
        onMutate: async ({postId, userId}) => {
            await queryClient.cancelQueries({queryKey})
            const previousData = queryClient.getQueryData(queryKey);


            queryClient.setQueryData(queryKey, (oldData: any) => {
                if(!oldData) return

                return {
                    ...oldData,
                    pages: oldData.pages.map((page : FullPostType[]) => 
                     page.map((post) => {
                        if(postId === post.id){
                            const resposted = post.reposts.some((rep) => rep.userId === userId)

                            if(resposted){
                                return {
                                    ...post,
                                    reposts: post.reposts.filter(rep => rep.userId !== userId)
                                }
                            }
                            else{
                                return {
                                    ...post,
                                    reposts: [...post.reposts, {userId: userId}]
                                }
                            }
                        }
                        return post
                     }))
                }

            })


            return {previousData}

        },

        onError: (err, variables, context) => {
            queryClient.setQueryData(queryKey, context?.previousData)
        }
            
    })
}