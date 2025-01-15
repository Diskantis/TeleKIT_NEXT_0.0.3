import React from "react";

import { role } from "@/lib/utils";
import SideBar from "@/components/SideBar";
import TableSearch from "@/components/TableSearch";

const UserCreatePage = () => {
  const menu = [
    {
      icon: "/icon.svg#home",
      label: "Главная",
      href: `/${role}`,
      visible: ["admin", "user", "guest"],
    },
    {
      icon: "/icon.svg#kit",
      label: "Список пользователей",
      href: "/list/users",
      visible: ["admin", "user", "guest"],
    },
    {
      icon: "/icon.svg#calendar",
      label: "Добавить пользователя",
      href: "/create/users",
      visible: ["admin", "user", "guest"],
    },
  ];
  return (
    <>
      {/*MAIN*/}
      <div className="flex">
        {/*MAIN LEFT*/}
        <div className="w-[13%] sm:w-[13%] lg:w-[13%]">
          <div
            className="h-[calc(100vh-96px)] flex flex-col justify-between bg-gray-900 mx-4 py-4
            rounded-md xs:pr-0 md:pr-3"
          >
            <SideBar menu={menu} pathPage="/create/users" role={role!} />
          </div>
        </div>
        {/*MAIN RIGHT*/}
        <div className="w-[87%] sm:w-[87%] lg:w-[87%]">
          <div className="h-full flex flex-col justify-between bg-gray-900 mr-4 p-4 rounded-md">
            {/*TOP*/}
            <div className="flex items-center justify-between mb-3">
              <h1 className="hidden md:block text-2xl font-semibold">
                Добавление события
              </h1>
              <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                <TableSearch />
              </div>
            </div>
            {/*WORK AREA*/}
            <div className="w-full h-[30px] bg-cyan-950 border-b-2 rounded-t-md"></div>
            <div className=" flex-grow-[1] mt-3">SDFSDFSDF</div>
            <div className="w-full h-[30px] bg-cyan-950 border-t-2 rounded-b-md"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCreatePage;
