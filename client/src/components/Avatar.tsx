import { Image } from "@imagekit/next";


const Avatar = ({src} : {src : string}) => {
  return (
    <div className="w-10  h-10 relative ">
          <Image
            src={src || "/default-avatar.png"}
            alt="Picture of the author"
            fill
            className="object-cover rounded-full"
          />
        </div>
  )
}

export default Avatar
