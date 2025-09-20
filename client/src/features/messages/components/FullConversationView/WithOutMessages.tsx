import Image from 'next/image'
import React from 'react'

interface WithOutMessagesProps {
    otherUser: {
        imageUrl: string,
        username: string,
        displayName: string
    }
}

const WithOutMessages = ({otherUser} : WithOutMessagesProps) => {
  return (
    <div className="flex w-full flex-col items-center gap-6 mb-10">
                <Image
                  alt="imageUser"
                  src={otherUser.imageUrl}
                  width={70}
                  height={70}
                  className="rounded-full"
                />
                <p className="text-text-gray text-sm">
                  Inicia una conversación con {otherUser.username}{" "}
                  <span className="text-primary-color text-xs">
                    ({otherUser.displayName}).
                  </span>
                </p>
              </div>
  )
}

export default WithOutMessages
