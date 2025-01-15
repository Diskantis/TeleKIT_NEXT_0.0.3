import React from "react";

import { role } from "@/lib/utils";
import EventList from "@/components/EventList/EventList";
import ModerCalendarContainer from "@/components/ModerCalendar/ModerCalendarContainer";
import SideBar from "@/components/SideBar";

const menu = [
  {
    icon: "/icon.svg#home",
    label: "Главная",
    href: `/${role}`,
    visible: ["admin", "user", "guest"],
  },
  {
    icon: "/icon.svg#calendar",
    label: "Расписание",
    href: "/list/events",
    visible: ["admin", "user", "guest"],
  },
  {
    icon: "/icon.svg#kit",
    label: "Комплекты",
    href: "/list/kits",
    visible: ["admin", "user"],
  },
  {
    icon: "/icon.svg#camera",
    label: "Оборудование",
    href: "/list/equipments",
    visible: ["admin", "user"],
  },
  {
    icon: "/icon.svg#people",
    label: "Получатели",
    href: "/list/recipients",
    visible: ["admin", "user"],
  },
  {
    icon: "/icon.svg#people",
    label: "Пользователи",
    href: "/list/users",
    visible: ["admin", "user"],
  },
];

const UserPage = () => {
  return (
    <>
      {/*MAIN*/}
      <div className="flex">
        {/*MAIN LEFT*/}
        <div className="w-[13%] sm:w-[13%] lg:w-[13%]">
          <div
            className="h-[calc(100vh-96px)] flex flex-col justify-between bg-gray-900 mx-4 py-4
            rounded-md xs:pr-0 md:pr-4"
          >
            <SideBar menu={menu} pathPage="/admin" role={role!} />
          </div>
        </div>
        {/*MAIN RIGHT*/}
        <div className="w-[87%] sm:w-[87%] lg:w-[87%]">
          <div className="h-full flex flex-col bg-gray-900 mr-4 p-4 rounded-md">
            <div className="flex gap-4 flex-col xl:flex-row">
              {/*WORK LEFT*/}
              <div className="w-full xl:w-3/4">
                <h1 className="hidden md:block text-2xl font-semibold pb-4">
                  Страница пользователя
                </h1>
                <ModerCalendarContainer />
              </div>
              {/*WORK RIGHT*/}
              <div className="w-full xl:w-1/4 flex flex-col gap-4">
                <EventList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
