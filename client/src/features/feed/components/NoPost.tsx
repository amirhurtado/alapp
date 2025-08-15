import Image from "next/image";


const NoPost = ({postLength} : {postLength : number}) => {
  return (
    <>
    {postLength === 0 && (
        <div className="flex flex-col items-center justify-center mt-10">
          <Image
            src={"/ghost.webp"}
            alt="No posts"
            width={150}
            height={150}
            className="mx-auto mb-4"
          />
          <p className="text-text-gray font-poppins text-xs md:text-sm">
            Sigue a personas, o sube tu primer post.
          </p>
        </div>
      )}
      </>
  )
}

export default NoPost
