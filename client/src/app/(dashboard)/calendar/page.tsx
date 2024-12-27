import React from "react";

import EventCalendar from "@/components/EventCalendar/EventCalendar";
import BigCalendar from "@/components/BigCalendar/BigCalendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "@/components/EventCalendar/EventCalendar.css";
import "@/components/BigCalendar/BigCalendar.css";

const CalendarPage = () => {
  return (
    <div className="h-full flex flex-col bg-gray-900 mr-4 p-4 rounded-md">
      <div className="flex gap-4 flex-col xl:flex-row">
        {/*LEFT*/}
        <div className="w-full xl:w-3/4">
          <h1 className="hidden md:block text-2xl font-semibold pb-4">
            Страница пользователя
          </h1>
          <BigCalendar />
        </div>
        {/*RIGHT*/}
        <div className="w-full xl:w-1/4 flex flex-col gap-4">
          <EventCalendar />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
