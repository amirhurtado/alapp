import Image from "next/image";


const Avatar = ({ src }: { src: string }) => {
  return (
    <div className="w-10  h-10 min-h-10 min-w-10 relative ">
      <Image
        src={src}
        alt="Picture of the author"
        fill
        className="object-cover rounded-full"
      />
    </div>
  );
};

export default Avatar;
