import { getMessagesWithUserAction } from "@/actions/messages/getMessages";
import { useFormatDateLabel } from "@/features/messages/hooks/useFormatDateLabel"
import { MessageType } from "@/types";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface InfiniteMessagesProps {
  messages: MessageType[];
  currentUserId: string;
  otherUserId: string;
  queryKey: unknown[];
}

const InfiniteMessages = ({
  messages: initialMessages,
  currentUserId,
  otherUserId,
  queryKey,
}: InfiniteMessagesProps) => {
  const queryClient = useQueryClient();
  const loadmoreRef = useRef(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // --- Lógica del Label Flotante ---
  const [floatingDate, setFloatingDate] = useState({ visible: false, date: "" });
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const formatDateLabel = useFormatDateLabel();
  // --- Fin de la Lógica del Label Flotante ---

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam = 1 }) =>
        getMessagesWithUserAction(currentUserId, otherUserId, pageParam),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === 15 ? allPages.length + 1 : undefined,
      initialPageParam: 1,
      initialData: {
        pageParams: [1],
        pages: [initialMessages],
      },
    });

  const messages = data.pages?.flatMap((page) => page) ?? [];

  // useEffect para el scroll infinito (Intersection Observer)
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

  // useEffect para el scroll inicial al fondo
  useEffect(() => {
    const shouldScroll = queryClient.getQueryData<boolean>([ "scrollFlag", queryKey ]);
    if (shouldScroll) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      queryClient.setQueryData(["scrollFlag", queryKey], false);
    }
  }, [data, queryClient, queryKey]);

  // --- Lógica del Label Flotante ---
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    const containerTop = scrollContainerRef.current.getBoundingClientRect().top;
    let topMessageDate = null;

    const messageElements = scrollContainerRef.current.querySelectorAll(".message-item");
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
    }, 1500); // El label desaparecerá después de 1.5s de inactividad
  };
  // --- Fin de la Lógica del Label Flotante ---

  return (
    <div className="relative h-full w-full">
      {/* Label de Fecha Flotante */}
      <div
        className={`absolute top-4 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-300 ${
          floatingDate.visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <span className="bg-input  text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {floatingDate.date}
        </span>
      </div>

      {/* Contenedor de Mensajes con Scroll */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex flex-col-reverse gap-4 overflow-y-auto p-4 h-full"
      >
        <div ref={bottomRef} />

        {messages.map((message) => {
          const isCurrentUser = message.senderId === currentUserId;
          return (
            <div
              key={message.id}
              className={`message-item flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
              data-date={message.createdAt.toString()} // Atributo para leer la fecha
            >
              <div
                className={`max-w-xs md:max-w-md flex flex-col rounded-lg px-4 py-2 bg-hover border-1 ${
                  isCurrentUser ? "rounded-br-none items-end" : "rounded-bl-none"
                }`}
              >
                <div
                  className={`flex flex-col gap-4 ${
                    isCurrentUser ? "rounded-br-none items-end" : "rounded-bl-none"
                  }`}
                >
                  {message.imageUrl && (
                    <Image
                      src={message.imageUrl}
                      alt="image"
                      width={180}
                      height={180}
                      className="rounded-lg mt-1"
                    />
                  )}
                  <p className="text-sm">{message.content}</p>
                </div>
                <p
                  className={`text-[.6rem] mt-1 ${
                    isCurrentUser ? "text-blue-100" : "text-gray-500"
                  } text-right`}
                >
                  {new Date(message.createdAt).toLocaleTimeString("es-CO", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}

        <div className="h-[1rem] flex items-center justify-center py-1" ref={loadmoreRef}>
          {isFetchingNextPage && (
            <LoaderCircle className="animate-spin mx-auto text-primary-color min-w-[1.5rem] min-h-[1.5rem]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default InfiniteMessages;