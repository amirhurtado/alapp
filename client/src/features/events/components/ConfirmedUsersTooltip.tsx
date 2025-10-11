// src/features/events/components/ConfirmedUsersTooltip.tsx

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UserCard from "@/features/user/UserCard";
import { FullEventType } from "@/types";

interface ConfirmedUsersTooltipProps {
  confirmations: FullEventType["usersConfirm"];
}

export const ConfirmedUsersTooltip = ({
  confirmations,
}: ConfirmedUsersTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <p className="text-xs text-text-gray cursor-pointer">
            Confirmados: {confirmations?.length ?? 0}
          </p>
        </TooltipTrigger>
        <TooltipContent className="bg-secondary text-white p-4 w-80">
          <div className="flex flex-col gap-3">
            <p className="font-semibold text-sm border-b border-border pb-2">
              Usuarios confirmados:
            </p>

            {(confirmations && confirmations.length > 0) ? (
              // -> 1. A este div le aplicamos las clases para el scroll
              <div className="max-h-[240px] overflow-y-auto flex flex-col gap-2 pr-2">
                {confirmations.map((confirmation) => (
                  <UserCard
                    key={confirmation.user.id}
                    user={{
                      id: confirmation.user.id,
                      name: confirmation.user.name || "",
                      displayName: confirmation.user.displayName || "",
                      imageUrl: confirmation.user.imageUrl || "",
                    }}
                  />
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400">
                Nadie ha confirmado aún.
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};