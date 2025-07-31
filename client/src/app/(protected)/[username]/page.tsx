import Link from "next/link";
import { ArrowLeft, CalendarX, MapPin, MessageSquare } from "lucide-react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Image as Imagekit } from "@imagekit/next";
import Feed from "@/components/Feed/Feed";


const myProfile = false;

const UserPage = () => {

  const { username} = useParams();

  console.log("Username:", username);

  return (
    <div className="h-screen flex flex-col overflow-hidden overflow-y-scroll">
      <div className="bg-[#00000084] p-3 flex gap-9 items-center backdrop-blur-md z-10 sticky top-0">
        <Link href="/">
          <ArrowLeft size={20} className="cursor-pointer" />
        </Link>
        <div className="flex flex-col ">
          <p className="font-semibold text-md">Username</p>
          <p className="text-xs text-text-gray">42 posts</p>
        </div>
      </div>
      <div className="relative flex flex-col mb-6">
        {/* Profile Header */}
        <div>
          <div className="relative w-full h-[120px] md:h-[200px] border-y-1 border-border">
            <Image
              src={"/base-image-profile.webp"}
              alt="Profile Background"
              fill
              className=" object-cover"
            />
          </div>
          <div className="absolute -translate-y-1/2 left-4 w-[4.5rem] h-[4.5rem] md:w-[6rem] md:h-[6rem]">
            <Imagekit
              src="/user-default"
              alt="User Avatar"
              fill
              className="object-cover rounded-full border-2 border-black"
            />
          </div>

          <div className="flex justify-end px-3 pt-4">
            {myProfile ? (
              <button className="bg-white rounded-lg h-8  text-black ">
                <p className="text-sm">Editar perfil</p>
              </button>
            ) : (
              <div className="flex gap-4 items-center">
                <button className="border-1 border-border rounded-full w-10 h-10 flex items-center justify-center">
                  <MessageSquare size={20} className="" />
                </button>
                <button className="bg-white px-3 rounded-lg h-8  text-black ">
                  <p className="text-sm">Seguir</p>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-4">
            <h1 className="text-2xl font-semibold">Username</h1>
            <p className="text-sm text-text-gray">@username</p>

            <p className="mt-3 text-sm">Descipcion de gustos</p>

            <div className="flex gap-5 mt-1 text-text-gray text-sm">
                <div className="flex items-center gap-1">
                    <MapPin size={16} className="" />
                    <span>Pais</span>
                </div>
                <div className="flex items-center gap-1">
                    <CalendarX size={16} className="" />
                    <span >Se unió en x</span>
                </div>
            </div>

            <div className="flex gap-5 mt-3">
                <div className="flex items-end gap-1 hover:underline cursor-pointer">
                    <p className="text-sm">1011</p>
                    <span className="text-text-gray text-xs">Siguiendo</span>
                </div>
                <div className="flex items-end gap-1 hover:underline cursor-pointer ">
                    <p className="text-sm">408</p>
                    <span className="text-text-gray text-xs">Seguidos</span>
                </div>
            </div>

        </div>
      </div>

      <Feed />
    </div>
  );
};

export default UserPage;
