import { toggleJoinGroupAction } from "@/actions/group/interactionsGroup";
import { FullInfoGroup, UserCardType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useJoinMitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      groupId,
      infoUser,
    }: {
      groupId: number;
      infoUser: UserCardType;
    }) => {
      return toggleJoinGroupAction(groupId, infoUser.id);
    },
    onMutate: async ({ groupId, infoUser }) => {
      const queryKey = ["infoGroup", { groupId: groupId }];
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldData: FullInfoGroup) => {
        if (!oldData) return;

        const newMembers = {
          ...oldData,
          members: oldData.isMember
            ? oldData.members.filter((mem) => mem.user.id != infoUser.id)
            : [{ user: infoUser }, ...oldData.members],
        };

        return {
          ...newMembers,
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
