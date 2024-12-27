import React from "react";

import UserCard from "@/components/UserCard";
import EventCalendar from "@/components/EventCalendar/EventCalendar";
import "@/components/EventCalendar/EventCalendar.css";

const AdminPage = () => {
  return (
    <div className="h-full flex flex-col bg-gray-900 mr-4 p-4 rounded-md">
      <div className="flex gap-4 flex-col xl:flex-row">
        {/*LEFT*/}
        <div className="w-full xl:w-3/4 ">
          <h1 className="hidden md:block text-2xl font-semibold mb-4">
            Страница администратора
          </h1>
          {/*USER CARDS*/}
          <div className="flex gap-4 justify-between flex-wrap">
            <UserCard type="admin" />
            <UserCard type="user" />
            <UserCard type="guest" />
            <UserCard type="staff" />
          </div>
        </div>
        {/*RIGHT*/}
        <div className="w-full xl:w-1/4 flex flex-col gap-4">
          <EventCalendar />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
