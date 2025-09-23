import { createPostAction } from "@/actions/post/createPost";
import { socket } from "@/socket";
import { FullPostType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

 type oldDataType = {

  pages: FullPostType[][]


}

export const useCreatePostMutation = (currenUserId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) =>
      createPostAction(formData),
    onSuccess: async (response) => {

      const {post, mentionedIdsArray} = response


      const queryKeyFeed = ["postsFeed", currenUserId, {placement: "mainFeed"}]
      await queryClient.cancelQueries({ queryKey: queryKeyFeed });


      queryClient.setQueryData(queryKeyFeed, (oldData: oldDataType) => {

        if (!oldData) return;
        return {
          ...oldData,
          pages: oldData.pages.map((page: FullPostType[], index: number) => {
            if (index === 0) {
              return [post, ...page];
            }
            return page;
          }),
        };
      });

      const queryKeyProfile = ["postsFeed", currenUserId, {placement: "profile"}];
      queryClient.setQueryData(queryKeyProfile, (oldData: oldDataType) => {
        if (!oldData) return;
        return {
          ...oldData,
          pages: oldData.pages.map((page: FullPostType[], index: number) => {
            if (index === 0) {
              return [post, ...page];
            }
            return page;
          }),
        };
      });


      if(mentionedIdsArray.length > 0){
        mentionedIdsArray.map((mentionedId) => (
             socket.emit("sendNotification", mentionedId )

        ))
      } 
    },
  });
};
