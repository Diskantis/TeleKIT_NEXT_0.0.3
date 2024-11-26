import React from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SideBar from "@/components/SideBar";

const menu = [
  {
    title: "MENU",
    items: [
      {
        icon: "/icon.svg#calendar",
        label: "Расписание",
        href: "schedule",
        visible: ["ADMIN", "USER", "GUEST"],
      },
      {
        icon: "/icon.svg#kit",
        label: "Комплекты",
        href: "kits",
        visible: ["ADMIN", "USER"],
      },
      {
        icon: "/icon.svg#camera",
        label: "Оборудование",
        href: "equipments",
        visible: ["ADMIN", "USER"],
      },
      {
        icon: "/icon.svg#people",
        label: "Получатели",
        href: "recipients",
        visible: ["ADMIN", "USER"],
      },
      {
        icon: "/icon.svg#people",
        label: "Пользователи",
        href: "users",
        visible: ["ADMIN"],
      },
      {
        icon: "/icon.svg#admin",
        label: "Админ панель",
        href: "admin",
        visible: ["ADMIN"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/icon.svg#profile",
        label: "Профиль",
        href: "/profile",
        visible: ["ADMIN", "USER"],
      },
      {
        icon: "/icon.svg#settings",
        label: "Настройки",
        href: "/settings",
        visible: ["ADMIN"],
      },
    ],
  },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen">
      {/*HEADER*/}
      <Header />
      {/*MAIN*/}
      <div className="flex">
        {/*LEFT*/}
        <div className="w-[14%] sm:w-[13%] md:w-[13%] lg:w-[22%] xl:w-[18%] 3xl:w-[13%]">
          <SideBar menu={menu} />
        </div>
        {/*RIGHT*/}
        <div className="w-[86%] sm:w-[87%] md:w-[87%] lg:w-[78%] xl:w-[88%] 3xl:w-[87%]">
          {children}
        </div>
      </div>
      {/*FOOTER*/}
      <Footer />
    </div>
  );
}
