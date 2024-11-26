import React from "react";
import Link from "next/link";
import { role } from "@/lib/data";

type Menu = {
  title: string;
  items: {
    icon: string;
    label: string;
    href: string;
    visible: string[];
  }[];
}[];

const SideBar = ({ menu }: { menu: Menu }) => {
  return (
    <div className="h-[calc(100vh-112px)] bg-gray-900 mx-4 py-4 pr-4 rounded-md">
      {role === "GUEST" ? (
        <>
          <h1 className="uppercase pb-[20px] font-light pl-4 cursor-default">
            Телевизионный журналистский комплект
          </h1>
          <p className="uppercase text-orange-300 pl-4 italic lg:block cursor-default">
            ЗАО «Второй национальный телеканал»
          </p>
        </>
      ) : (
        menu.map((i) => (
          <div key={i.items[0].label} className="flex flex-col gap-2">
            <span className="hidden lg:block text-gray-400 font-light my-2">
              {/*{i.title}*/}
            </span>
            {i.items.map((item) => {
              if (item.visible.includes(role)) {
                return (
                  <div
                    key={item.label}
                    className="md:px-4 rounded-r-md hover:bg-cyan-700"
                  >
                    <Link
                      href={item.href}
                      className="flex items-center justify-center lg:justify-start gap-4 text-gray-200"
                    >
                      <svg className="w-5 h-5 flex fill-gray-300">
                        <use xlinkHref={item.icon} width={20} height={20} />
                      </svg>
                      <span className="hidden lg:block">{item.label}</span>
                    </Link>
                  </div>
                );
              }
            })}
          </div>
        ))
      )}
    </div>
  );
};

export default SideBar;
