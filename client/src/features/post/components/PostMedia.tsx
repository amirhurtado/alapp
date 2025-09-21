import { Image } from "@imagekit/next";

interface PostMediaProps {
  mediaUrl: string | null;
  mediaType: string | null;
}

const PostMedia = ({ mediaUrl, mediaType }: PostMediaProps) => {

  if (!mediaUrl || !mediaType) {
    return null;
  }

  return (
    <div className="relative w-full max-w-[500px] aspect-video mt-4 border border-border rounded-xl overflow-hidden">
      {mediaType === "IMAGE" && (
        <Image
          src={mediaUrl}
          alt="Post image"
          fill
          priority
          className="object-cover"
        />
      )}
      
      {mediaType === "VIDEO" && (
        <video
          src={mediaUrl} 
          controls
          preload="metadata"
          className="w-full h-full object-cover bg-black"
        >
          Tu navegador no soporta la etiqueta de video.
        </video>
      )}
    </div>
  );
};

export default PostMedia;