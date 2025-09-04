import { deleteEventAction } from "@/actions/event/deleteEvent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Event as EventType } from "@/generated/prisma";

type oldData = {
  pages: EventType[][];
};

export const useDeleteEventMutation = (groupId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ eventId }: { eventId: number }) => {
      return deleteEventAction(eventId);
    },
    onMutate: ({ eventId }) => {
      const queryKey = ["events", { groupId: groupId }];

      queryClient.cancelQueries({ queryKey: queryKey });

      queryClient.setQueryData(queryKey, (oldData: oldData) => {
        if (!oldData) return;

        return {
          ...oldData,
          pages: oldData.pages.map((page) =>
            page.filter((event) => event.id !== eventId)
          ),
        };
      });
    },
  });
};
