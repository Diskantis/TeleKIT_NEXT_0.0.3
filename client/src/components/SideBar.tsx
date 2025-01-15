"use client";

import React, { useState } from "react";
import Link from "next/link";

type Menu = {
  icon: string;
  label: string;
  href: string;
  visible: string[];
}[];

const SideBar = ({
  menu,
  role,
  pathPage,
}: {
  menu: Menu;
  role: string;
  pathPage: string;
}) => {
  const [path, setPath] = useState(pathPage);

  return (
    <div className="flex flex-col gap-2 mt-6">
      <div className="h-[calc(100vh-152px)] flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          {menu.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <div
                  key={item.label}
                  className={`${item.href === path ? "bg-cyan-950" : ""} rounded-r-md hover:bg-cyan-900 
                  xs:pl-3 xs:rounded-r-none md:rounded-r-md`}
                >
                  <Link
                    href={item.href}
                    className="2xl:flex items-center justify-center lg:justify-start text-gray-200 pr-2"
                    onClick={() => setPath(item.href)}
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
          className={`rounded-r-md hover:bg-cyan-900 xs:px-3 xs:rounded-r-none md:rounded-r-md`}
        >
          <Link
            href="/"
            className="2xl:flex items-center justify-center lg:justify-start text-gray-200"
            onClick={() => setPath("/")}
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
