import Feed from "@/components/Feed";
import Share from "@/components/Share";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="h-full overflow-hidden px-2">
      <div className="flex w-full justify-between items-end font-sans text-[.9rem] pt-[1rem] border-b-1 border-border font-semibold">
        <Link href={"/"} className="w-full flex flex-col">
          <p className="text-center border-b-3 border-icon-blue pb-2">
            Para tí
          </p>
        </Link>
        <Link href={"/"} className="w-full">
          <p className="text-center text-text-gray pb-2">Siguiendo</p>
        </Link>
      </div>

      <div className="flex flex-col h-full  overflow-y-scroll">
        <Share />
        <Feed />
      </div>
    </div>
  );
}
