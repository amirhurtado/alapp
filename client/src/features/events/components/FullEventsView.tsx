"use client";
import React, { useEffect, useRef } from "react";
import { FullEventType, FullUserType } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getEventsAction } from "@/actions/event/getEvent";
import EventCard from "./EventCard";
import { CalendarDays, LoaderCircle } from "lucide-react";

interface FullEventsViewProps {
  events: FullEventType[];
  groupId: number;
  imAdmin: boolean;
  infoCurrentUser: FullUserType;
}

const FullEventsView = ({
  events: initialEvents,
  groupId,
  imAdmin,
  infoCurrentUser,
}: FullEventsViewProps) => {
  const queryKey = ["events", { groupId: groupId }];

  const loadmoreRef = useRef(null);

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

  useEffect(() => {
    if (!loadmoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage)
        fetchNextPage();
    });

    observer.observe(loadmoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1 items-center mt-5 text-text-gray">
        <CalendarDays size={20} />
        <p className="text-md  font-poppins mt-1  ">Eventos del grupo :</p>
      </div>

      <div className="flex flex-col gap-4">
        {events.map((event, index) => (
          <div key={index}>
            <EventCard event={event} imAdmin={imAdmin} infoCurrentUser={infoCurrentUser} />
          </div>
        ))}
      </div>
      <div
        ref={loadmoreRef}
        className="h-[2rem] flex items-center justify-center py-8"
      >
        {isFetchingNextPage && (
          <LoaderCircle
            className="animate-spin mx-auto text-primary-color "
            size={24}
          />
        )}

        {!hasNextPage && (
          <p className="text-center text-text-gray text-sm">
            No hay más eventos.
          </p>
        )}
      </div>
      
    </div>
  );
};

export default FullEventsView;
