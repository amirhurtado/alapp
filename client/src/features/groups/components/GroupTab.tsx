interface GroupTabProps {
  selectSection: "createGroup" | "exploreGroups";
  setSelectSection: React.Dispatch<
    React.SetStateAction<"createGroup" | "exploreGroups">
  >;
}

const GroupTab = ({ selectSection, setSelectSection }: GroupTabProps) => {
  const classActive =
    "border-b-3 border-primary-color text-white font-semibold";
  const classInactive =
    "border-b-3 border-transparent text-text-gray  hover:text-white transition-colors duration-200 ease-in cursor-pointer";

  return (
    <div className="flex justify-between items-end font-sans text-[.9rem]  font-semibold">
      <button
        onClick={() => setSelectSection("exploreGroups")}
        className={`w-full text-center pb-2 ${
          selectSection === "exploreGroups" ? classActive : classInactive
        }`}
      >
        Explorar
      </button>

      <button
        onClick={() => setSelectSection("createGroup")}
        className={`w-full pb-2 flex items-center gap-2 justify-center ${
          selectSection === "createGroup" ? classActive : classInactive
        }`}
      >
        Crear
      </button>
    </div>
  );
};

export default GroupTab;
