import moment from "moment/moment";

type ButtonProps = {
  today: moment.Moment;
};

const GridMonthCalendar = ({ today }: ButtonProps) => {
  const startDay = today.clone().startOf("week").startOf("day");
  const day = startDay.clone().subtract(1, "day");

  const daysArray = [...Array(7)].map(() => day.add(1, "day").clone());

  const isCurrentDay = (day: moment.MomentInput) => moment().isSame(day, "day");

  return (
    <>
      <div
        className="grid grid-cols-7 grid-rows-1 gap-[1px] bg-gray-400
        rounded-tl-md rounded-tr-md border-[1px] border-b-0"
      >
        {daysArray.map((dayItem) => (
          <div
            key={dayItem.format("DD MM YYYY")}
            className="flex items-center justify-center first-letter:uppercase gap-[1px] p-2
            first:rounded-tl-md last:rounded-tr-md bg-cyan-950 cursor-default"
          >
            {dayItem.format("ddd D MMM")}
          </div>
        ))}
      </div>
      <div
        className="h-[calc(100vh-295px)] grid grid-cols-7 gap-[1px] border-[1px]
        rounded-bl-md rounded-br-md bg-gray-400"
      >
        {daysArray.map((dayItem) => (
          <div
            key={dayItem.format("DD MM YYYY")}
            className={`
            ${isCurrentDay(dayItem) ? "bg-gray-700" : dayItem.day() === 0 || dayItem.day() === 6 ? "text-red-600 bg-gray-800" : "bg-gray-900"}
            flex flex-col justify-between p-2 [&:nth-last-child(7)]:rounded-bl-md last:rounded-br-md hover:bg-gray-700`}
          >
            <div className="text-end"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GridMonthCalendar;
