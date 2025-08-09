import { Image } from "@imagekit/next";

interface PostBodyProps {
  postDescription: string | null;
  postImageUrl: string | null;
}

const Body = ({ postDescription, postImageUrl }: PostBodyProps) => {
  return (
    <div className="mt-1">
      <p className="text-[0.85rem] text-gray-300">{postDescription}</p>

      {postImageUrl && (
        <div className="relative w-full max-w-[500px] h-[300px] mt-4 border border-border rounded-xl overflow-hidden">
          <Image
            src={postImageUrl}
            alt="Post image"
            fill
            priority
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default Body;
