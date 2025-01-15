import React from "react";

import { role } from "@/lib/utils";
import SideBar from "@/components/SideBar";
// import UserCard from "@/components/UserCard";
import EventCalendar from "@/components/EventCalendar/EventCalendar";
import "@/components/EventCalendar/EventCalendar.css";
import ModerCalendarContainer from "@/components/ModerCalendar/ModerCalendarContainer";

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

const AdminPage = () => {
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
              <div className="w-full xl:w-3/4 ">
                <h1 className="hidden md:block text-2xl font-semibold mb-4">
                  Страница администратора
                </h1>
                {/*USER CARDS*/}
                <div className="flex gap-4 justify-between flex-wrap">
                  {/*<UserCard type="admin" />*/}
                  {/*<UserCard type="user" />*/}
                  {/*<UserCard type="guest" />*/}
                  {/*<UserCard type="staff" />*/}
                </div>
                <ModerCalendarContainer />
              </div>
              {/*WORK RIGHT*/}
              <div className="w-full xl:w-1/4 flex flex-col gap-4">
                <EventCalendar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
