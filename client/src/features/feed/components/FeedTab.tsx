import Link from "next/link";

interface FeedTabInterface {
  placement : "mainFeed" | "exploreFeed" 
}

const FeedTab = ({placement}: FeedTabInterface) => {

  const classActive = "border-b-3 border-primary-color mb-3 "
  const classInactive = "border-b-3 border-transparent mb-3 text-text-gray"

  return (
    <div className="flex w-full justify-between items-end font-sans text-[.9rem] pt-[1rem]  font-semibold">
      <Link
        aria-label="Ir a para tí"
        href={"/"}
        className="w-full flex flex-col"
      >
        <p className={`text-center  ${placement === "mainFeed" ? classActive : classInactive } pb-2`}>
          Principal
        </p>
      </Link>

      <div className="relative w-full">
        <Link aria-label="Ir a siguiendo" href={"/explore"} className="w-full">
        <p className={`text-center  ${placement === "exploreFeed" ? classActive : classInactive }  pb-2`}>Explorar</p>
      </Link>
      {placement === "exploreFeed" && <p className="absolute left-[50%]  whitespace-nowrap -translate-x-1/2 text-xs text-primary-color font-semibold">Nuevas personas</p>}
      </div>
      
    </div>
  );
};

export default FeedTab;
