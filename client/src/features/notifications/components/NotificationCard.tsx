import React from 'react'
import { Notification as NotificationType } from '@/generated/prisma';

interface NotificationCardProps {
    // Define the props for NotificationCard here
    notification: NotificationType;
    }

const NotificationCard = ({ notification }: NotificationCardProps) => {

    console.log({ notification });
  return (
    <div>
    
    </div>
  )
}

export default NotificationCard
