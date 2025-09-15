// NUEVO CÓDIGO - A PRUEBA DE FALLOS
"use client"
import React from "react";
import { fullNotificationType } from "@/types";
import Avatar from "@/components/ui/Avatar";
import Link from "next/link";
import TimeAgo from "@/components/ui/TimeAgo";
import {
  CalendarPlus2,
  Heart,
  MessageSquare,
  Repeat2,
  Star,
  UserRoundPlus,
} from "lucide-react";
import DeleteNotification from "./DeleteNotification";

interface NotificationCardProps {
  notification: fullNotificationType;
}

const NotificationCard = ({ notification }: NotificationCardProps) => {
  return (
    // 1. El contenedor principal ahora es un DIV con posición RELATIVA. Ya no es un Link.
    <div className="border-border border-1 rounded-lg p-2 md:p-4 bg-hover relative">
      
      {/* 2. El contenido visual se pone en otro DIV con z-index para que esté por encima del link. */}
      <div className="relative z-20 flex flex-col gap-2">
        <div className="flex gap-3 items-center">
          <Avatar src={notification.sender.imageUrl} />
          <div className="flex items-center gap-2">
            {notification.type === "like" ? (
              <Heart className=" w-[1.2rem] h-[1.2rem] flex-shrink-0   text-icon-pink" />
            ) : notification.type === "favorite" ? (
              <Star className=" w-[1.2rem] h-[1.2rem] flex-shrink-0  text-icon-yellow" />
            ) : notification.type === "repost" ? (
              <Repeat2 className=" w-[1.2rem] h-[1.2rem] flex-shrink-0  text-icon-green" />
            ) : notification.type === "commment" ? (
              <MessageSquare
                size={18}
                className=" w-[1.2rem] h-[1.2rem] flex-shrink-0  text-primary-color"
              />
            ) : (
              notification.type === "follow" ? (
                <UserRoundPlus
                  size={18}
                  className=" w-[1.2rem] h-[1.2rem] flex-shrink-0  text-white"
                />
              ) :
              notification.type === "createEvent" && <CalendarPlus2
                  size={18}
                  className=" w-[1.2rem] h-[1.2rem] flex-shrink-0  text-white"
                />
            )}
            <p className="font-semibold text-xs md:text-sm ">
              <span className="text-xs text-primary-color">
                @{notification.sender.name}{" "}
              </span>
              <span className="text-">{notification.message}.</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2 justify-end items-center">
          {/* DeleteNotification AHORA ESTÁ AQUÍ, seguro y por encima del link */}
          <DeleteNotification notificationId={notification.id} />
          <TimeAgo createdAt={notification.createdAt} />
        </div>
      </div>

      {/* 3. El Link ahora es una "capa fantasma" que ocupa todo el espacio pero está POR DEBAJO (z-index 10). */}
      <Link href={notification.link} className="absolute inset-0 z-10">
        <span className="sr-only">Ver notificación</span>
      </Link>
    </div>
  );
};

export default NotificationCard;