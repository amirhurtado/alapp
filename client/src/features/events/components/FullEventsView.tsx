"use client"
import React from "react";
import { Event as EventType } from "@/generated/prisma";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getEventsAction } from "@/actions/event/getEvent";
import EventCard from "./EventCard";
import { CalendarDays } from "lucide-react";

interface FullEventsViewProps {
  events: EventType[];
  groupId: number;
}

const FullEventsView = ({
  events: initialEvents,
  groupId,
}: FullEventsViewProps) => {
  const queryKey = ["events", { groupId: groupId }];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam = 1 }) => {
        return getEventsAction(groupId, pageParam);
      },
      getNextPageParam: (lastPage, allPages) => {
        {
          return lastPage.length === 3 ? allPages.length + 1 : undefined;
        }
      },
      initialPageParam: 1,
      initialData: {
        pages: [initialEvents],
        pageParams: [1],
      },
    });

  const events = data.pages.flatMap((page) => page);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1 items-center mt-5 text-text-gray">
        <CalendarDays size={20} />
        <p className="text-md  font-poppins mt-1  ">Eventos del grupo :</p>
      </div>
      
      <div className="flex flex-col gap-4">
        {events.map((event, index) => (
          <div key={index}>
            <EventCard event={event} />
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <p className="text-xs text-text-gray">No se han creado eventos</p>
      )}
    </div>
  );
};

export default FullEventsView;
