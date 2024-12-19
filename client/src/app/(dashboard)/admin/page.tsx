import React from "react";

import UserCard from "@/components/UserCard";

const AdminPage = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-2xl font-semibold">
          Административная панель
        </h1>
      </div>
      {/*USER CARDS*/}
      <div className="flex gap-4 justify-between flex-wrap">
        <UserCard type="admin" />
        <UserCard type="user" />
        <UserCard type="guest" />
        <UserCard type="staff" />
      </div>
    </>
  );
};

export default AdminPage;
