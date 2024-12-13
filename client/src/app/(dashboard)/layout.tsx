import React from "react";

import SideBar from "@/components/SideBar";
import { AUTH } from "@/lib/settings";

const menu = [
  {
    icon: "/icon.svg#calendar",
    label: "Расписание",
    href: "/list/events",
    visible: ["ADMIN", "USER", "GUEST"],
  },
  {
    icon: "/icon.svg#kit",
    label: "Комплекты",
    href: "/list/kits",
    visible: ["ADMIN", "USER"],
  },
  {
    icon: "/icon.svg#camera",
    label: "Оборудование",
    href: "/list/equipments",
    visible: ["ADMIN", "USER"],
  },
  {
    icon: "/icon.svg#people",
    label: "Получатели",
    href: "/list/recipients",
    visible: ["ADMIN", "USER"],
  },
  {
    icon: "/icon.svg#people",
    label: "Пользователи",
    href: "/list/users",
    visible: ["ADMIN"],
  },
  {
    icon: "/icon.svg#people",
    label: "Админ панель",
    href: "/admin",
    visible: ["ADMIN"],
  },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/*MAIN*/}
      <div className="flex">
        {/*LEFT*/}
        <div className="w-[12%] sm:w-[13%] lg:w-[12%]">
          <div
            className="h-[calc(100vh-96px)] flex flex-col justify-between bg-gray-900 mx-4 py-4
          rounded-md xs:pr-0 md:pr-4"
          >
            {AUTH !== "AUTH" ? (
              <div className="mt-4">
                <h1 className="uppercase pb-[20px] font-light pl-4 cursor-default">
                  Телевизионный
                  <br />
                  журналистский
                  <br />
                  комплект
                </h1>
                <p className="uppercase text-orange-300 mt-4 pl-4 italic lg:block cursor-default">
                  ЗАО «Второй
                  <br />
                  национальный
                  <br />
                  телеканал»
                </p>
              </div>
            ) : (
              <SideBar menu={menu} />
            )}
          </div>
        </div>
        {/*RIGHT*/}
        <div className="w-[88%] sm:w-[87%] lg:w-[88%]">
          <div className="h-full flex flex-col justify-between bg-gray-900 mr-4 p-4 rounded-md">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
