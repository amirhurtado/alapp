"use client"; 

import { getMessagesWithUserAction } from "@/actions/messages/getMessages";
import { useFormatDateLabel } from "@/features/messages/hooks/useFormatDateLabel";
import { MessageType } from "@/types";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import { socket } from "@/socket"; // Importamos el socket
import { markConversationAsReadAction } from "@/actions/messages/resetUnreadsMessage";

interface InfiniteMessagesProps {
  messages: MessageType[];
  currentUserId: string;
  otherUser: {
    id: string;
    imageUrl: string;
    username: string;
  };
  queryKey: unknown[];
}

const InfiniteMessages = ({
  messages: initialMessages,
  currentUserId,
  otherUser,
  queryKey,
}: InfiniteMessagesProps) => {
  const queryClient = useQueryClient();
  const loadmoreRef = useRef(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // --- Lógica del Label Flotante (sin cambios) ---
  const [floatingDate, setFloatingDate] = useState({
    visible: false,
    date: "",
  });
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const formatDateLabel = useFormatDateLabel();

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

    const containerTop = scrollContainerRef.current.getBoundingClientRect().top;
    let topMessageDate = null;

    const messageElements =
      scrollContainerRef.current.querySelectorAll(".message-item");
    for (const messageEl of messageElements) {
      if (messageEl.getBoundingClientRect().top >= containerTop) {
        topMessageDate = (messageEl as HTMLElement).dataset.date;
        break;
      }
    }

    if (topMessageDate) {
      setFloatingDate({
        visible: true,
        date: formatDateLabel(topMessageDate),
      });
    }

    hideTimeoutRef.current = setTimeout(() => {
      setFloatingDate((prev) => ({ ...prev, visible: false }));
    }, 1500);
  };


  useEffect(() => {
    const onNewMessage = (senderUserId: string) => {
      if (senderUserId === otherUser.id) {
        markConversationAsReadAction(currentUserId, otherUser.id);
        queryClient.invalidateQueries({ queryKey });
      }
    };

    socket.on("newMessage", onNewMessage);

    return () => {
      socket.off("newMessage", onNewMessage);
    };
  }, [queryClient, queryKey, otherUser.id]);

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam = 1 }) =>
        getMessagesWithUserAction(currentUserId, otherUser.id, pageParam),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === 15 ? allPages.length + 1 : undefined,
      initialPageParam: 1,
      initialData: {
        pageParams: [1],
        pages: [initialMessages],
      },
    });

  const messages = data.pages?.flatMap((page) => page) ?? [];

  // useEffect para el scroll infinito (sin cambios)
  useEffect(() => {
    if (!loadmoreRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    observer.observe(loadmoreRef.current);
    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // useEffect para el scroll inicial al fondo (sin cambios)
  useEffect(() => {
    const shouldScroll = queryClient.getQueryData<boolean>([
      "scrollFlag",
      queryKey,
    ]);
    if (shouldScroll) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      queryClient.setQueryData(["scrollFlag", queryKey], false);
    }
  }, [data, queryClient, queryKey]);

  // --- Lógica para procesar y renderizar mensajes (sin cambios) ---
  const elementsToRender: React.ReactNode[] = [];

  messages.forEach((message, index) => {
    const isCurrentUser = message.senderId === currentUserId;

    elementsToRender.push(
      <MessageItem
        key={message.id}
        message={message}
        isCurrentUser={isCurrentUser}
        otherUser={{
          username: otherUser.username,
          imageUrl: otherUser.imageUrl,
        }}
        queryKey={queryKey} // Tu prop original está aquí, sin cambios
      />
    );

    const currentMessageDate = new Date(message.createdAt).toDateString();
    const nextMessage = messages[index + 1];
    const nextMessageDate = nextMessage
      ? new Date(nextMessage.createdAt).toDateString()
      : null;

    if (currentMessageDate !== nextMessageDate) {
      elementsToRender.push(
        <div
          key={`date-separator-${currentMessageDate}`}
          className="flex justify-center"
        >
          <span className="bg-input text-xs font-semibold px-3 rounded-full">
            {formatDateLabel(message.createdAt)}
          </span>
        </div>
      );
    }
  });

  return (
    <div className="relative h-full w-full">
      {/* Label de Fecha Flotante (sin cambios) */}
      <div
        className={`absolute top-4 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-300 ${
          floatingDate.visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <span className="bg-input text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {floatingDate.date}
        </span>
      </div>

      {/* Contenedor de Mensajes con Scroll (sin cambios) */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex flex-col-reverse gap-4 overflow-y-auto h-full"
      >
        <div ref={bottomRef} />

        {elementsToRender}

        <div
          className="h-[1rem] flex items-center justify-center py-1"
          ref={loadmoreRef}
        >
          {isFetchingNextPage && (
            <LoaderCircle className="animate-spin mx-auto text-primary-color min-w-[1.5rem] min-h-[1.5rem]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default InfiniteMessages;