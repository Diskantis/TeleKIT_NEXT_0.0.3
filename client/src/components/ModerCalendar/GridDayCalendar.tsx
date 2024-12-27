import moment from "moment/moment";

type ButtonProps = {
  today: moment.Moment;
};

const GridMonthCalendar = ({ today }: ButtonProps) => {
  const startDay = today.clone().startOf("day");

  const isCurrentDay = (day: moment.MomentInput) => moment().isSame(day, "day");

  return (
    <>
      <div className="bg-gray-400 rounded-t-md border-[1px] border-b-0">
        <div className="text-center p-2 rounded-t-md bg-cyan-950 cursor-default">
          {startDay.format("D dddd")}
        </div>
      </div>
      <div
        className={`h-[calc(100vh-295px)] border-[1px] rounded-b-md 
        ${isCurrentDay(today) ? "bg-gray-700" : "bg-gray-900"}`}
      >
        <div className="text-end"></div>
      </div>
    </>
  );
};

export default GridMonthCalendar;
