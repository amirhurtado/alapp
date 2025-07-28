import type { Metadata } from "next";
import { Poppins, Lato } from "next/font/google";
import "./globals.css";
import LeftBar from "@/components/LeftBar";
import RightBar from "@/components/RightBar";
import { ImageKitProvider } from "@imagekit/next";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Alapp",
  description: "Red social para cualquier persona",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${poppins.variable} antialiased`}>
        <ImageKitProvider urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}>
        <div className="flex justify-between mx-auto max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl">
          <div className="px-2 xsm:px-4 xxl:px-8 h-screen">
            <LeftBar />
          </div>
          <div  className="px-2h-screen flex-1 lg:max-w-[600px] border-x-[1px] border-border">{children} </div>
          <div className="px-2 flex-1 h-screen 
           hidden lg:flex ml-4 xl:ml-8">
            <RightBar />
          </div>
        </div>
        </ImageKitProvider>
      </body>
    </html>
  );
}
