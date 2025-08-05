import Link from "next/link";

const FeedTab = () => {
  return (
    <div className="flex w-full justify-between items-end font-sans text-[.9rem] pt-[1rem] border-b-1 border-border font-semibold">
      <Link
        aria-label="Ir a para tí"
        href={"/"}
        className="w-full flex flex-col"
      >
        <p className="text-center border-b-3 border-icon-blue pb-2">
          Principal
        </p>
      </Link>
      <Link aria-label="Ir a siguiendo" href={"/"} className="w-full">
        <p className="text-center text-text-gray pb-2">Explorar</p>
      </Link>
    </div>
  );
};

export default FeedTab;
