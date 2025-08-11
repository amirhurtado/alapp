import Link from "next/link";

interface FeedTabInterface {
  site: "main" | "explore"
}

const FeedTab = ({site}: FeedTabInterface) => {

  const classActive = "border-b-3 border-primary-color"
  return (
    <div className="flex w-full justify-between items-end font-sans text-[.9rem] pt-[1rem] border-b-1 border-border font-semibold">
      <Link
        aria-label="Ir a para tí"
        href={"/"}
        className="w-full flex flex-col"
      >
        <p className={`text-center  ${site === "main" ? classActive : "text-text-gray" } pb-2`}>
          Principal
        </p>
      </Link>
      <Link aria-label="Ir a siguiendo" href={"/explore"} className="w-full">
        <p className={`text-center  ${site === "explore" ? classActive : "text-text-gray" }  pb-2`}>Explorar</p>
      </Link>
    </div>
  );
};

export default FeedTab;
