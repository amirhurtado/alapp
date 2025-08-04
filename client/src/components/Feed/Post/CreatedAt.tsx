import { Dot } from "lucide-react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(relativeTime);
dayjs.locale("es");

const CreatedAt = ({ createdAt }: { createdAt: Date }) => {
  return (
    <div className="flex gap-2 items-center ">
      <Dot size={10} className="text-text-gray hidden md:block" />
      <span className="text-text-gray text-[.83rem]">
        {dayjs(createdAt).fromNow()}
      </span>
      ;
    </div>
  );
};

export default CreatedAt;
