import { createEventAction } from "@/actions/event/createEvent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Event as EventType } from "@/generated/prisma";
import { socket } from "@/socket";

type oldData = {
  pages: EventType[][];
};

export const useCreateEventMutation = (groupId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) => {
      return createEventAction(formData);
    },
    onSuccess: async (response) => {

      const {event, membersIdOfGroup} = response


      const queryKey = ["events", { groupId: groupId }];

      await queryClient.cancelQueries({ queryKey: queryKey });

      queryClient.setQueryData(queryKey, (oldData: oldData) => {
        if (!oldData) return;

        return {
          ...oldData,
          pages: oldData.pages.map((page, index) => {
            if (index === 0) {
              return [event, ...page];
            } else {
              return page;
            }
          }),
        };
      });



      socket.emit("sendGroupNotification", membersIdOfGroup)
    },
  });
};
