import { toggleFollowAction } from "@/actions/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type InfoUser = {
  id: string;
  name: string;
  displayName: string;
  imageUrl: string;
  isFriend: boolean;
};

export const useFollowMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      currentUserId,
      otherUserId,
    }: {
      currentUserId: string;
      otherUserId: string;
    }) => {
      return toggleFollowAction(currentUserId, otherUserId);
    },
    onMutate: async ({ currentUserId, otherUserId }) => {
      const recommendationQueryKey = ["recommendations", currentUserId];
      const fromProfileQueryKey = ["isFriendProfile", otherUserId];

      await queryClient.cancelQueries({ queryKey: recommendationQueryKey });
      await queryClient.cancelQueries({ queryKey: fromProfileQueryKey });

      const previousRecommendationData = queryClient.getQueryData(
        recommendationQueryKey
      );
      const previousDatafromProfile = queryClient.getQueryData(
        fromProfileQueryKey
      );

      if (previousRecommendationData) {
        queryClient.setQueryData(recommendationQueryKey, (oldData: any) => {
          return {
            ...oldData,
            pages: oldData.pages.map((page: InfoUser[]) =>
              page.map((user) => {
                if (user.id === otherUserId) {
                  return {
                    ...user,
                    isFriend: !user.isFriend,
                  };
                }
                return user;
              })
            ),
          };
        });
       }

       if(typeof previousDatafromProfile === 'boolean' ){
        queryClient.setQueryData(fromProfileQueryKey, !previousDatafromProfile);
       }


      return {recommendationQueryKey,  previousRecommendationData,fromProfileQueryKey ,  previousDatafromProfile };
    },
    onError: (err, variables, context) => {
    if (context?.previousRecommendationData) {
        queryClient.setQueryData(context.recommendationQueryKey, context.previousRecommendationData);
    }
    if (context?.previousDatafromProfile) {
        queryClient.setQueryData(context.fromProfileQueryKey, context.previousDatafromProfile);
    }
},
  });
};
