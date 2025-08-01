import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(relativeTime);
dayjs.locale("es");

const TimeAgo = ({ date }: { date: Date }) => {
  return <span className="text-text-gray text-[.83rem]">{dayjs(date).fromNow()}</span>;
};

export default TimeAgo;
