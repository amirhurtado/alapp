import LeftBar from "@/components/Sections/LeftBar";
import RightBar from "@/components/Sections/RightBar";
import { ImageKitProvider } from "@imagekit/next";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ImageKitProvider
      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
    >
      <div className="flex justify-between lg:justify-center h-[100%] mx-auto max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl">
        <div className="px-2 xsm:px-4 xxl:px-8 h-full">
          <LeftBar />
        </div>
        <div className=" h-full flex-1 lg:max-w-[600px] border-x-[1px] border-border">
          {children}{" "}
        </div>
        <div
          className=" h-screen px-2
           hidden lg:flex ml-2  lg:ml-6 max-w-[370px]"
        >
          <RightBar />
        </div>
      </div>
    </ImageKitProvider>
  );
}
