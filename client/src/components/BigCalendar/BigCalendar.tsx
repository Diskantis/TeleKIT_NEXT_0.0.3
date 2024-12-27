"use client";

import { useState } from "react";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "moment/locale/ru";
import { eventsData } from "@/lib/data";

const BigCalendar = () => {
  moment.locale("ru");
  const localizer = momentLocalizer(moment);

  const [view, setView] = useState<View>(Views.WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <div className="bg-gray-700 rounded-md">
      <Calendar
        localizer={localizer}
        events={eventsData}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        view={view}
        scrollToTime={new Date(2024, 0, 0, 7, 0)}
        messages={{
          next: ">",
          previous: "<",
          today: "сегодня",
          month: "месяц",
          week: "неделя",
          day: "день",
          date: "дата",
          time: "время",
          event: "событие",
          showMore: function showMore(total) {
            const y = total < 5 ? "я" : "й";
            return `+${total} событи${y}`;
          },
        }}
        onView={handleOnChangeView}
      />
    </div>
  );
};
export default BigCalendar;
