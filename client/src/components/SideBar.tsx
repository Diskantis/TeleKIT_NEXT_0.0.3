import React from "react";

import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

const menu = [
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
    visible: ["admin"],
  },
  {
    icon: "/icon.svg#people",
    label: "Админ панель",
    href: "/admin",
    visible: ["admin"],
  },
];

const SideBar = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;

  return (
    <div className="flex flex-col gap-2 mt-6">
      <div className="h-[calc(100vh-152px)] flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          {menu.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <div
                  key={item.label}
                  className={`rounded-r-md hover:bg-cyan-900
                 xs:pl-4 xs:rounded-r-none md:rounded-r-md`}
                >
                  <Link
                    href={item.href}
                    className="2xl:flex items-center justify-center lg:justify-start text-gray-200"
                    // onClick={() => setPath(item.href)}
                  >
                    <svg
                      className="w-6 h-5 mr-2 hiddenjustify-center fill-gray-300
                   xs:flex lg:hidden 2xl:flex"
                    >
                      <use xlinkHref={item.icon} width={20} height={20} />
                    </svg>
                    <span className="hidden lg:block lg:w-full">
                      {item.label}
                    </span>
                  </Link>
                </div>
              );
            }
          })}
        </div>
        <div
          className={`rounded-r-md hover:bg-cyan-900 xs:px-4 xs:rounded-r-none md:rounded-r-md`}
        >
          <Link
            href="/"
            className="2xl:flex items-center justify-center lg:justify-start text-gray-200"
            // onClick={() => setPath("/")}
          >
            <svg className="w-6 h-5 mr-2 hiddenjustify-center fill-gray-300 xs:flex lg:hidden 2xl:flex">
              <use xlinkHref="/icon.svg#logout" width={20} height={20} />
            </svg>
            <span className="hidden lg:block lg:w-full">ВЫХОД</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
