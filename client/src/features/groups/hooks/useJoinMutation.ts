import { toggleJoinGroupAction } from "@/actions/group/interactionsGroup";
import { FullInfoGroup } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useJoinMitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ groupId, userId }: { groupId: number; userId: string }) => {
      return toggleJoinGroupAction(groupId, userId);
    },
    onMutate: async ({ groupId, userId }) => {
      const queryKey = ["infoGroup", { groupId: groupId }];

      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldData: FullInfoGroup) => {
        if (!oldData) return;

        return {
          ...oldData,
          isMember: !oldData.isMember,
        };
      });

      return { queryKey, previousData };
    },
    onError: (err, variables, context) => {
      if (context) {
        queryClient.setQueryData(context.queryKey, context.previousData);
      }
    },
  });
};
