import { getFollowingsAction } from "@/actions/follow/follow";
import { UserCardType } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

interface InfiniteFollowingsInMessagesProps {
  followings: UserCardType[];
  currentUserId: string;
}

const InfiniteFollowingsInMessages = ({
  followings: initialFollowings,
  currentUserId,
}: InfiniteFollowingsInMessagesProps) => {
  const queryKey = ["followings", { place: "messages" }];
  const loadmoreRef = useRef(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam = 1 }) => {
        return getFollowingsAction(currentUserId, pageParam);
      },
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length + 1 : undefined;
      },
      initialPageParam: 1,
      initialData: {
        pageParams: [1],
        pages: [initialFollowings],
      },
    });

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

  const followings = data.pages?.flatMap((page) => page) ?? initialFollowings;

  return (
    <>
      {initialFollowings.length > 0 ? (
        <div className="w-full flex flex-col gap-4 ">
          <p className="text-text-gray text-xs">
            Envíale mensajes a las personas que sigues
          </p>
          <div className="flex gap-6 overflow-x-auto">
            {followings.map((user) => (
              <Link
                href={`/messages/chat/${user.name}`}
                key={user.id}
                className="flex flex-col justify-center gap-2"
              >
                <Image
                  src={user.imageUrl}
                  alt="imgUser"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex flex-col items-center text-xs">
                  <p className="">{user.name}</p>
                  <p className=" text-text-gray">{user.displayName}</p>
                </div>
              </Link>
            ))}

            <div ref={loadmoreRef} className="h-[2rem] w-[2rem]">
              {isFetchingNextPage && (
                <LoaderCircle
                  className="animate-spin mx-auto text-primary-color "
                  size={24}
                />
              )}
            </div>
          </div>
        </div>
      ) : 

      (<Link href={"/search"} >
        <p className="text-xs text-text-gray">No sigues a nadie aún.</p>
      <p className="text-xs text-primary-color underline">Ve y busca usuarios y escribeles!</p></Link>)}
    </>
  );
};

export default InfiniteFollowingsInMessages;
