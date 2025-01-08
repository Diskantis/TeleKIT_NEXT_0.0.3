"use client";

import moment from "moment";
import "moment/locale/ru";
import { useState } from "react";
import ButtonCalendar from "@/components/elements/ButtonCalendar";
import GridMonthCalendar from "@/components/ModerCalendar/GridMonthCalendar";
import GridWeekCalendar from "@/components/ModerCalendar/GridWeekCalendar";
import GridDayCalendar from "@/components/ModerCalendar/GridDayCalendar";

const ModerCalendar = ({
  data,
}: {
  data: { title: string; start: Date; end: Date }[];
}) => {
  moment.updateLocale("ru", { week: { dow: 1 } });
  moment().locale("ru");

  const [toDay, setToDay] = useState(moment());
  const [mode, setMode] = useState("week"); //"month" "week" "day"

  const firstDay = toDay.clone().startOf("week");
  const lastDay = toDay.clone().endOf("week");

  const handleToDay = () => setToDay(moment());
  const handlePrev = () => {
    if (mode === "month") {
      setToDay((prev) => prev.clone().subtract(1, "month"));
    } else if (mode === "week") {
      setToDay((prev) => prev.clone().subtract(1, "week"));
    } else if (mode === "day") {
      setToDay((prev) => prev.clone().subtract(1, "day"));
    }
  };
  const handleNext = () => {
    if (mode === "month") {
      setToDay((prev) => prev.clone().add(1, "month"));
    } else if (mode === "week") {
      setToDay((prev) => prev.clone().add(1, "week"));
    } else if (mode === "day") {
      setToDay((prev) => prev.clone().add(1, "day"));
    }
  };

  let label = "";
  switch (mode) {
    case "month":
      label = toDay.format("MMMM YYYY");
      break;
    case "week":
      label = toDay.format(
        `${firstDay.format("D MMMM")} - ${lastDay.format("D MMMM")}`,
      );
      break;
    case "day":
      label = toDay.format("MMMM");
      break;
    default:
      break;
  }

  return (
    <div className="bg-gray-700 rounded-md px-2 py-4">
      {/*TOOL BAR*/}
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          <ButtonCalendar
            value="&lt;"
            size="w-[2vw]"
            name="prev"
            mode={mode}
            onClick={handlePrev}
          />
          <ButtonCalendar
            value="сегодня"
            name="today"
            mode={mode}
            onClick={handleToDay}
          />
          <ButtonCalendar
            value="&gt;"
            size="w-[2vw]"
            name="next"
            mode={mode}
            onClick={handleNext}
          />
        </div>
        <span className="text-xl font-bold first-letter:uppercase">
          {label}
        </span>
        <div className="flex gap-2">
          <ButtonCalendar
            value="месяц"
            name="month"
            mode={mode}
            onClick={() => setMode("month")}
          />
          <ButtonCalendar
            value="неделя"
            name="week"
            mode={mode}
            onClick={() => setMode("week")}
          />
          <ButtonCalendar
            value="день"
            name="day"
            mode={mode}
            onClick={() => setMode("day")}
          />
        </div>
      </div>
      {/*GRID CALENDAR*/}
      {mode === "month" ? (
        <GridMonthCalendar today={toDay} data={data} />
      ) : mode === "week" ? (
        <GridWeekCalendar today={toDay} data={data} />
      ) : mode === "day" ? (
        <GridDayCalendar today={toDay} data={data} />
      ) : null}
    </div>
  );
};

export default ModerCalendar;
