import { getMessagesWithUserAction } from "@/actions/messages/getMessages";
import Avatar from "@/components/ui/Avatar";
import { useFormatDateLabel } from "@/features/messages/hooks/useFormatDateLabel";
import { MessageType } from "@/types";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

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

  // --- Lógica del Label Flotante ---
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
  // --- Fin de la Lógica del Label Flotante ---

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
    const shouldScroll = queryClient.getQueryData<boolean>([
      "scrollFlag",
      queryKey,
    ]);
    if (shouldScroll) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      queryClient.setQueryData(["scrollFlag", queryKey], false);
    }
  }, [data, queryClient, queryKey]);

  // --- Lógica para procesar y renderizar mensajes con separadores fijos ---
  const elementsToRender: React.ReactNode[] = [];

  messages.forEach((message, index) => {
    const isCurrentUser = message.senderId === currentUserId;
    // 1. Añade el componente del mensaje
    elementsToRender.push(
      <div
        key={message.id}
        className={`message-item flex gap-2 items-end ${
          isCurrentUser ? "justify-end" : "justify-start"
        }`}
        data-date={new Date(message.createdAt).toISOString()}
      >
        {message.senderId === otherUser.id && (
          <Link href={`/${otherUser.username}`}>
            <Avatar src={otherUser.imageUrl} />
          </Link>
        )}

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
            suppressHydrationWarning // <--- AÑADE ESTA LÍNEA
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

    const currentMessageDate = new Date(message.createdAt).toDateString();
    const nextMessage = messages[index + 1];
    const nextMessageDate = nextMessage
      ? new Date(nextMessage.createdAt).toDateString()
      : null;

    if (currentMessageDate !== nextMessageDate) {
      elementsToRender.push(
        <div
          key={`date-separator-${currentMessageDate}`}
          className="flex justify-center "
        >
          <span className="bg-input text-xs font-semibold px-3  rounded-full">
            {formatDateLabel(message.createdAt)}
          </span>
        </div>
      );
    }
  });

  return (
    <div className="relative h-full w-full  ">
      {/* Label de Fecha Flotante */}
      <div
        className={`absolute top-4 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-300  ${
          floatingDate.visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <span className="bg-input text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {floatingDate.date}
        </span>
      </div>

      {/* Contenedor de Mensajes con Scroll */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex flex-col-reverse gap-4 overflow-y-auto h-full "
      >
        <div ref={bottomRef} />

        {/* Renderiza el array que contiene mensajes y separadores fijos */}
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
