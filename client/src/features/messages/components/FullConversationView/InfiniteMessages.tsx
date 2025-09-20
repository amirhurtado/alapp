import { getMessagesWithUserAction } from "@/actions/messages/getMessages";
import { MessageType } from "@/types";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import React, { useEffect, useRef } from "react";

interface InfiniteMessagesProps {
  messages: MessageType[];
  currentUserId: string;
  otherUserId: string;
  queryKey: unknown[]
}

const InfiniteMessages = ({
  messages: initialMessages,
  currentUserId,
  otherUserId,
  queryKey
}: InfiniteMessagesProps) => {


  const queryClient = useQueryClient();
  const loadmoreRef = useRef(null)

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam = 1 }) => {
        return getMessagesWithUserAction(currentUserId, otherUserId, pageParam);
      },
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 15 ? allPages.length + 1 : undefined;
      },
      initialPageParam: 1,
      initialData: {
        pageParams: [1],
        pages: [initialMessages],
      },
    });

  const messages = data.pages?.flatMap((page) => page);


  useEffect(() => {


    if(!loadmoreRef.current || !hasNextPage) return

    const observer = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting && !isFetchingNextPage){
        fetchNextPage();
      }
    })

    observer.observe(loadmoreRef.current)


    return () => {
      observer.disconnect()
    }

  }, [hasNextPage, isFetchingNextPage, fetchNextPage])


  const bottomRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
    const shouldScroll = queryClient.getQueryData<boolean>(["scrollFlag", queryKey]);

    if (shouldScroll) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      queryClient.setQueryData(["scrollFlag", queryKey], false); // reset
    }
  }, [data, queryClient, queryKey]);




  return (
  <div className="flex flex-col-reverse gap-4 overflow-y-auto">
    <div ref={bottomRef} />

    {messages.map((message) => {
      const isCurrentUser = message.senderId === currentUserId;

      return (
        <div
          key={message.id}
          className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-xs md:max-w-md flex flex-col rounded-lg px-4 py-1 bg-hover border-1 ${
              isCurrentUser
                ? " rounded-br-none  items-end"
                : "  rounded-bl-none"
            }`}
          >
            <p className="text-sm">{message.content}</p>
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
);

};

export default InfiniteMessages;
