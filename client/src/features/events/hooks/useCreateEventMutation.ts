import { createEventAction } from "@/actions/event/createEvent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Event as EventType } from "@/generated/prisma";

type oldData = {
  pages: EventType[][];
};

export const useCreateEventMutation = (groupId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) => {
      return createEventAction(formData);
    },
    onSuccess: async (data) => {
      const queryKey = ["events", { groupId: groupId }];

      await queryClient.cancelQueries({ queryKey: queryKey });

      queryClient.setQueryData(queryKey, (oldData: oldData) => {
        if (!oldData) return;

        return {
          ...oldData,
          pages: oldData.pages.map((page, index) => {
            if (index === 0) {
              return [data, ...page];
            } else {
              return page;
            }
          }),
        };
      });
    },
  });
};
