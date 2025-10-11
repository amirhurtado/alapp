"use client";

import { useInfiniteQuery } from "@tanstack/react-query"; 
import React, { useEffect, useRef } from "react";
import { fullNotificationType } from "@/types";
import { getNoticationsAction } from "@/actions/notification/getNotification";
import NotificationCard from "./NotificationCard";
import { LoaderCircle } from "lucide-react";
import { useNotificationCount } from "@/store/useNotification";


interface FullNotificationsViewProps {
  notifications: fullNotificationType[];
  currentUserId: string;
}

const FullNotificationsView = ({
  notifications: initialNotifications,
  currentUserId,
}: FullNotificationsViewProps) => {
  const countNotifications = useNotificationCount((state) => state.count);
  const resetCountNotifications = useNotificationCount((state) => state.reset);
  const incrementCount = useNotificationCount((state) => state.increment);

  const queryKey = ["notifications", { currentUserId: currentUserId }];
  const loadmoreRef = useRef(null);


  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      return getNoticationsAction(currentUserId, pageParam);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    initialData: {
      pages: [initialNotifications],
      pageParams: [1],
    },
    refetchOnMount: true,
  });

  useEffect(() => {
    if (countNotifications > 0) {
      resetCountNotifications();
    }
  }, []);

  useEffect(() => {}, [incrementCount]);

  useEffect(() => {
    if (!loadmoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(loadmoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const notifications =
    data?.pages.flatMap((page) => page) ?? initialNotifications;
  return (
    <div className="flex flex-col max-h-[100dvh] gap-4 p-4 overflow-y-auto ">
      {notifications.map((notification, index) => (
        <div key={index}>
          <NotificationCard notification={notification} />
        </div>
      ))}

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
            No hay más notificaciones.
          </p>
        )}
      </div>
    </div>
  );
};

export default FullNotificationsView;
