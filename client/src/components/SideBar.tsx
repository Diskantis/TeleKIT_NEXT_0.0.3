"use client";

import React, { useState } from "react";
import Link from "next/link";
import { role } from "@/lib/data";

type Menu = {
  icon: string;
  label: string;
  href: string;
  visible: string[];
}[];

const SideBar = ({ menu }: { menu: Menu }) => {
  const [path, setPath] = useState("");

  return (
    <div className="flex flex-col gap-2 mt-6">
      {role === "GUEST" ? (
        <>
          <h1 className="uppercase pb-[20px] font-light pl-4 cursor-default">
            Телевизионный журналистский комплект
          </h1>
          <p
            className="uppercase text-orange-300 pl-4 italic
           lg:block cursor-default"
          >
            ЗАО «Второй национальный телеканал»
          </p>
        </>
      ) : (
        <div className="h-[calc(100vh-152px)] flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            {menu.map((item) => {
              if (item.visible.includes(role)) {
                return (
                  <div
                    key={item.label}
                    className={`rounded-r-md ${item.href === path ? "bg-cyan-950" : ""} hover:bg-cyan-900
                 xs:pl-4 xs:rounded-r-none md:rounded-r-md`}
                  >
                    <Link
                      href={item.href}
                      className="2xl:flex items-center justify-center lg:justify-start text-gray-200"
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
            className={`rounded-r-md hover:bg-cyan-900 xs:px-4 xs:rounded-r-none md:rounded-r-md`}
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
      )}
    </div>
  );
};

export default SideBar;
