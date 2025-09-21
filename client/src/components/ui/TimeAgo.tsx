import { Dot } from "lucide-react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(relativeTime);
dayjs.locale("es");

const TimeAgo = ({ createdAt, withOutDot = false, textxs = false }: { createdAt: Date, withOutDot?: boolean, textxs?: boolean }) => {
  return (
    <div className="flex gap-2 items-center ">
      
      {!withOutDot  && <Dot size={10} className="text-text-gray hidden md:block" /> }
      <span className={`text-text-gray ${textxs ? "text-[.63rem]" : "text-xs md:text-[.83rem]"} `}>
        {dayjs(createdAt).fromNow()}
      </span>
    </div>
  );
};

export default TimeAgo;
