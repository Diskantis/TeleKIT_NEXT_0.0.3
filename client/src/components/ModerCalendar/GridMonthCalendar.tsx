import moment from "moment/moment";

type ButtonProps = {
  today: moment.Moment;
  data: { title: string; start: Date; end: Date }[];
};

const GridMonthCalendar = ({ today, data }: ButtonProps) => {
  const startDay = today.clone().startOf("month").startOf("week");
  const day = startDay.clone().subtract(1, "day");

  const weekArray = [...Array(7)];
  const daysArray = [...Array(42)].map(() => day.add(1, "day").clone());

  const isCurrentDay = (day: moment.MomentInput) => moment().isSame(day, "day");
  const isMonthDays = (day: moment.MomentInput) => today.isSame(day, "month");

  return (
    <>
      <div
        className="grid grid-cols-7 grid-rows-1 gap-[1px] bg-gray-400
        rounded-tl-md rounded-tr-md border-[1px] border-b-0"
      >
        {weekArray.map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-center first-letter:uppercase gap-[1px] p-2
            first:rounded-tl-md last:rounded-tr-md bg-cyan-950 cursor-default"
          >
            {moment()
              .day(i + 1)
              .format("dddd")}
          </div>
        ))}
      </div>
      <div
        className="h-[calc(100vh-295px)] grid grid-cols-7 grid-rows-6 gap-[1px] border-[1px]
        rounded-bl-md rounded-br-md bg-gray-400"
      >
        {daysArray.map((dayItem) => (
          <div
            key={dayItem.unix()}
            className={`${isMonthDays(dayItem) ? "text-gray-100" : "text-gray-500"}
            ${isCurrentDay(dayItem) ? "bg-cyan-950" : dayItem.day() === 0 || dayItem.day() === 6 ? "text-red-600 bg-gray-800" : "bg-gray-900"}
            flex flex-col p-1 [&:nth-last-child(7)]:rounded-bl-md last:rounded-br-md hover:bg-gray-700 cursor-pointer
            `}
          >
            <div className="text-end">{dayItem.format("D")}</div>
            <div className="text-gray-100">
              {data
                .filter(
                  (event: any) =>
                    event.start >= dayItem &&
                    event.start <= dayItem.clone().endOf("day"),
                )
                .map((event: any, index) => (
                  <li key={index} className="list-none">
                    <button
                      className="w-full text-sm text-gray-100 text-start bg-blue-700 rounded-[4px] m-[1px] p-1 relative
                      overflow-ellipsis overflow-hidden whitespace-nowrap cursor-pointer"
                    >
                      <div>{event.title}</div>
                      <div className="w-full flex justify-between">
                        {event.start.toTimeString().slice(0, 5)} -{" "}
                        {event.end.toTimeString().slice(0, 5)}
                      </div>
                      <div className="overflow-ellipsis overflow-hidden whitespace-nowrap">
                        {event.recipients.map((recipient: any) => (
                          <span key={recipient.id}> {recipient.username}</span>
                        ))}
                      </div>
                    </button>
                  </li>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GridMonthCalendar;
