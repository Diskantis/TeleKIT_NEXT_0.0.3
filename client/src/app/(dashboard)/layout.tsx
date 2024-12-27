import React from "react";

import SideBar from "@/components/SideBar";

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
            <SideBar />
          </div>
        </div>
        {/*RIGHT*/}
        <div className="w-[88%] sm:w-[87%] lg:w-[88%]">{children}</div>
      </div>
    </>
  );
}
