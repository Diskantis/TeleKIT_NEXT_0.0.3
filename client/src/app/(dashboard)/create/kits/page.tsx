import React from "react";

import { role } from "@/lib/utils";
import SideBar from "@/components/SideBar";
import KitDnDBoard from "@/components/DnD/KitDnDBoard";

const KitCreatePage = () => {
  const menu = [
    {
      icon: "/icon.svg#home",
      label: "Главная",
      href: `/${role}`,
      visible: ["admin", "user", "guest"],
    },
    {
      icon: "/icon.svg#kit",
      label: "Список комплектов",
      href: "/list/kits",
      visible: ["admin", "user", "guest"],
    },
    {
      icon: "/icon.svg#calendar",
      label: "Создать комплект",
      href: "/create/kits",
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
            <SideBar menu={menu} pathPage="/create/kits" role={role!} />
          </div>
        </div>
        {/*MAIN RIGHT*/}
        <div className="w-[87%] sm:w-[87%] lg:w-[87%]">
          <div className="h-full flex flex-col justify-between bg-gray-900 mr-4 p-4 rounded-md">
            <KitDnDBoard />
          </div>
        </div>
      </div>
    </>
  );
};

export default KitCreatePage;
