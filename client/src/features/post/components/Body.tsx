import { Image } from "@imagekit/next";

interface PostBodyProps {
  postDescription: string | null;
  postMediaUrl: string | null;
  postMediaType: string | null;
}

const PostBody = ({
  postDescription,
  postMediaUrl,
  postMediaType,
}: PostBodyProps) => {
  return (
    <div className="mt-1">
      {postDescription && (
        <p className="text-[0.85rem] text-gray-300 whitespace-pre-wrap">
          {postDescription}
        </p>
      )}

      {postMediaUrl && postMediaType && (
        <div className="relative w-full max-w-[500px] aspect-video mt-4 border border-border rounded-xl overflow-hidden">
          
          {postMediaType === "IMAGE" && (
            <Image
              src={postMediaUrl}
              alt="Post image"
              fill
              priority
              className="object-cover"
            />
          )}

          {postMediaType === "VIDEO" && (
            <video
              src={postMediaUrl}
              controls 
              preload="metadata"
              className="w-full h-full object-cover bg-black"
            >
              Tu navegador no soporta la etiqueta de video.
            </video>
          )}
        </div>
      )}
    </div>
  );
};

export default PostBody;