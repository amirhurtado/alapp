import { Image } from "@imagekit/next";


const Avatar = ({src} : {src : string}) => {
  return (
    <div className="w-10 h-10 relative overflow-hidden rounded-full">
          <Image
            src={src || "/default-avatar.png"}
            alt="Picture of the author"
            fill
            className="object-cover"
          />
        </div>
  )
}

export default Avatar
