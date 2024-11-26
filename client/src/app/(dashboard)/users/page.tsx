import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import Image from "next/image";
import { role, userData } from "@/lib/data";
import React from "react";
import TableSearch from "@/components/TableSearch";

type User = {
  id: number;
  userId: string;
  avatar: string;
  lastName: string;
  firstName: string;
  surName: string;
  email: string;
  password: string;
  phone?: string;
  role: string;
  createdAt: string;
};

const columns = [
  {
    header: "#",
    accessor: "info",
    className:
      "table-cell py-2 px-2 text-center border-r border-gray-600 rounded-tl-md",
  },
  {
    header: "Аватар",
    accessor: "avatar",
    className: "hidden text-center md:table-cell border-r border-gray-600",
  },
  {
    header: "Фамилия",
    accessor: "lastname",
    className: "hidden pl-2 md:table-cell border-r border-gray-600",
  },
  {
    header: "Имя",
    accessor: "firstname",
    className: "hidden pl-2 md:table-cell border-r border-gray-600",
  },
  {
    header: "Отчество",
    accessor: "surname",
    className: "hidden pl-2 md:table-cell border-r border-gray-600",
  },
  {
    header: "Email",
    accessor: "email",
    className: "hidden pl-2 lg:table-cell border-r border-gray-600",
  },
  {
    header: "Телефон",
    accessor: "phone",
    className: "hidden pl-2 lg:table-cell border-r border-gray-600",
  },
  {
    header: "Роль",
    accessor: "role",
    className: "hidden text-center lg:table-cell border-r border-gray-600",
  },
  {
    header: "Дата регистрации",
    accessor: "createdAt",
    className: `hidden text-center lg:table-cell ${role === "ADMIN" && "border-r border-gray-600"}`,
  },
];
const UserListPage = () => {
  const renderRow = (item: User) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 text-sm text-gray-300 hover:bg-[#08334468]"
    >
      <td className="hidden md:table-cell text-center border-r border-gray-600">
        {item.userId}
      </td>
      <td className="flex items-center justify-center gap-4 py-1 border-r border-gray-600">
        <Image
          src={item.avatar}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-9 h-9 rounded-full object-cover"
        />
      </td>
      <td className="hidden md:table-cell pl-2 border-r border-gray-600">
        {item.lastName}
      </td>
      <td className="hidden md:table-cell pl-2 border-r border-gray-600">
        {item.firstName}
      </td>
      <td className="hidden md:table-cell pl-2 border-r border-gray-600">
        {item.surName}
      </td>
      <td className="hidden md:table-cell pl-2 border-r border-gray-600">
        {item.email}
      </td>
      <td className="hidden md:table-cell pl-2 border-r border-gray-600">
        {item.phone}
      </td>
      <td className="hidden md:table-cell text-center border-r border-gray-600">
        {item.role}
      </td>
      <td
        className={`hidden md:table-cell text-center ${role === "ADMIN" && "border-r border-gray-600"}`}
      >
        {item.createdAt}
      </td>
      {role === "ADMIN" && (
        <td>
          <div className="flex items-center justify-center gap-2">
            <Link href={`/list/teachers/${item.id}`}>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full border-none bg-transparent
              hover:border-[1px] hover:border-lime-700 hover:bg-lime-700"
              >
                <svg className="w-5 h-5 flex fill-lime-500 hover:fill-gray-50">
                  <use xlinkHref="/icon.svg#edit" width={20} height={20} />
                </svg>
              </button>
            </Link>
            <button
              className="w-7 h-7 flex items-center justify-center rounded-full border-none bg-transparent
              hover:border-[1px] hover:border-red-600 hover:bg-red-600"
            >
              <svg className="w-5 h-5 flex fill-red-600 hover:fill-gray-50">
                <use xlinkHref="/icon.svg#delete" width={20} height={20} />
              </svg>
            </button>
          </div>
        </td>
      )}
    </tr>
  );

  return (
    <div className="h-full flex flex-col justify-between bg-gray-900 mr-4 p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-2xl font-semibold">Пользователи</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-400">
              <svg className="w-4 h-4 fill-slate-900">
                <use xlinkHref="/icon.svg#filter" width={16} height={16} />
              </svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-400">
              <svg className="w-5 h-5 fill-slate-900">
                <use xlinkHref="/icon.svg#sort" width={20} height={20} />
              </svg>
            </button>
            {role === "ADMIN" && (
              <button className="flex items-center justify-center rounded-full bg-orange-400">
                <svg className="w-8 h-8 fill-slate-900">
                  <use xlinkHref="/icon.svg#create" width={32} height={32} />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
      {/*LIST*/}
      <div className=" flex-grow-[1] mt-3">
        <Table columns={columns} renderRow={renderRow} data={userData} />
      </div>
      {/*PAGINATION*/}
      <Pagination />
    </div>
  );
};

export default UserListPage;
