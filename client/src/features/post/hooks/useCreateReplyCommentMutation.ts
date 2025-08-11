import { createCommentAction } from "@/actions/comment";
import { FullCommentType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateReplyCommentMutation = (commentId: number, postId : number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) => {
      return createCommentAction(formData);
    },
    onSuccess: (data) => {

      const queryKeyReplies = ["commentsReply", commentId]
      const queryKeyCommentsBase = ["comments", postId]


      const dataM = queryClient.getQueryData(queryKeyCommentsBase)

      console.log("ME INTERESA",dataM)




      queryClient.setQueryData(queryKeyReplies, (oldData: any) => {
        if (!oldData) return;

        return {
          ...oldData,
          pages: oldData.pages.map((page: FullCommentType[], i: number) => {
            if (i === 0) {
              return [data, ...page];
            }
            return page;
          }),
        };
      });

      queryClient.setQueryData(queryKeyCommentsBase, (oldData: any) => {
        if(!oldData) return

        return {
          ...oldData,
          pages: oldData.pages.map((page: FullCommentType[]) => {
            return page.map((comment) => {
              if(comment.id === commentId){
                return {
                  ...comment,
                  _count: {comments: comment._count.comments + 1}
                }
              }
              return comment

            })
          })
        }
      })
    },
  });
};
