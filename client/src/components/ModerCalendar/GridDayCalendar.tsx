import moment from "moment/moment";

type ButtonProps = {
  today: moment.Moment;
  data: { title: string; start: Date; end: Date }[];
};

const GridMonthCalendar = ({ today, data }: ButtonProps) => {
  const isCurrentDay = (day: moment.MomentInput) => moment().isSame(day, "day");

  return (
    <>
      <div className="bg-gray-400 rounded-tl-md rounded-tr-md border-[1px] border-b-0">
        <div
          className="flex items-center justify-center first-letter:uppercase gap-[1px] p-2
            first:rounded-tl-md last:rounded-tr-md bg-cyan-950 cursor-default"
        >
          {today.format("dddd D MMMM")}
        </div>
      </div>
      <div
        className="h-[calc(100vh-295px)] grid gap-[1px] border-[1px]
        rounded-bl-md rounded-br-md bg-gray-400"
      >
        <div
          className={`
            ${isCurrentDay(today) ? "bg-gray-700" : "bg-gray-900"}
            flex flex-col justify-between p-2 rounded-b-md hover:bg-gray-700`}
        >
          <div className="text-end">
            {data
              .filter(
                (event: any) =>
                  event.start.toLocaleDateString("ru-RU") ===
                  today.format("DD.MM.YYYY"),
              )
              .map((event: any, index) => (
                <li key={index} className="list-none">
                  <button
                    className="w-full text-gray-100 text-sm text-start bg-blue-700 rounded-[4px] m-[1px] p-1 relative
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
      </div>
    </>
  );
};

export default GridMonthCalendar;
