import { toggleAssistanceEventAction } from "@/actions/event/toggleAssistanceEvent";
import { socket } from "@/socket";
import { FullEventType, FullUserType } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type OldDataType = {
  pages: FullEventType[][];
  pageParams: number[]; // Es importante incluir esto para que el tipo coincida
};

// -> 1. Definimos los tipos para las variables de la mutación
interface ToggleAssistanceVariables {
  eventId: number;
  user: FullUserType; // Ahora esperamos el objeto de usuario completo
}

export const useToggleAssistance = (groupId: number) => {
  const queryClient = useQueryClient();
  const queryKey = ["events", { groupId: groupId }];

  return useMutation({
    // -> 2. La mutación recibe las nuevas variables
    mutationFn: async ({ eventId, user }: ToggleAssistanceVariables) => {
      // La acción del servidor solo necesita el ID del usuario
      return toggleAssistanceEventAction(eventId, user.id);
    },
    
    // -> 3. onMutate ahora tiene acceso al objeto de usuario completo
    onMutate: async ({ eventId, user: newUser }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<OldDataType>(queryKey);

      queryClient.setQueryData<OldDataType>(queryKey, (oldData) => {
        if (!oldData) return undefined;

        return {
          ...oldData,
          pages: oldData.pages.map((page) =>
            page.map((event) => {
              if (event.id === eventId) {
                const isConfirmed = event.usersConfirm.some(
                  (confirmation) => confirmation.user.id === newUser.id
                );
                return {
                  ...event,
                  // -> 4. La lógica de actualización ahora usa el objeto newUser completo
                  usersConfirm: isConfirmed
                    ? event.usersConfirm.filter(
                        (confirmation) => confirmation.user.id !== newUser.id
                      )
                    : [...event.usersConfirm, { user: newUser }], // Se añade el objeto con la estructura correcta
                };
              }
              return event;
            })
          ),
        };
      });

      return { previousData };
    },
    
    // -> 5. (Recomendado) Revertir en caso de error
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    
    // -> 6. (Recomendado) Re-sincronizar con el servidor al final
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },

    onSuccess: (userNotificationId) => {
      if (userNotificationId) {
        socket.emit("sendNotification", userNotificationId);
      }
    },
  });
};