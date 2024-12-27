import React from "react";

import ModerCalendar from "@/components/ModerCalendar/ModerCalendar";
import EventList from "@/components/EventList/EventList";

const UserPage = () => {
  return (
    <div className="h-full flex flex-col bg-gray-900 mr-4 p-4 rounded-md">
      <div className="flex gap-4 flex-col xl:flex-row">
        {/*LEFT*/}
        <div className="w-full xl:w-3/4">
          <h1 className="hidden md:block text-2xl font-semibold pb-4">
            Страница пользователя
          </h1>
          <ModerCalendar />
        </div>
        {/*RIGHT*/}
        <div className="w-full xl:w-1/4 flex flex-col gap-4">
          <EventList />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
