import React from "react";

import { Prisma, User } from "@prisma/client";
import prisma from "@/lib/prisma";
import { role } from "@/lib/data";
import { ITEM_PER_PAGE } from "@/lib/settings";

import Link from "next/link";
import Image from "next/image";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import FormModal from "@/components/FormModal";

type UserList = User & { createdAt: Date };

const columns = [
  {
    header: "#",
    accessor: "info",
    className:
      "table-cell py-2 px-2 text-center border-r border-gray-600 rounded-tl-md",
  },
  {
    header: "Аватар",
    accessor: "img",
    className: "hidden text-center lg:table-cell border-r border-gray-600",
  },
  {
    header: "Username",
    accessor: "username",
    className: "hidden pl-2 md:table-cell border-r border-gray-600",
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
    header: "Пароль",
    accessor: "password",
    className: "hidden pl-2 lg:table-cell border-r border-gray-600",
  },
  {
    header: "Телефон",
    accessor: "phone",
    className: "hidden pl-2 lg:table-cell border-r border-gray-600",
  },
  {
    header: "Дирекция",
    accessor: "department",
    className: "hidden pl-2 lg:table-cell border-r border-gray-600",
  },
  {
    header: "Должность",
    accessor: "position",
    className: "hidden pl-2 lg:table-cell border-r border-gray-600",
  },
  {
    header: "Трудовые отношения",
    accessor: "stateStatus",
    className: "hidden pl-2 lg:table-cell border-r border-gray-600",
  },
  {
    header: "Роль",
    accessor: "role",
    className: "hidden text-center px-3 lg:table-cell border-r border-gray-600",
  },
  {
    header: "Дата регистрации",
    accessor: "createdAt",
    className: "hidden text-center lg:table-cell border-r border-gray-600",
  },
  {
    header: "Дата обновления",
    accessor: "updatedAt",
    className: `hidden text-center xl:table-cell rounded-tr-md
     ${role === "ADMIN" && "border-r border-gray-600 rounded-tr-none"}`,
  },
];

const renderRow = (item: UserList) => (
  <tr
    key={item.username}
    className="border-b border-gray-200 text-sm text-gray-300 hover:bg-[#08334468]"
  >
    <td className="hidden md:table-cell text-center border-r border-gray-600">
      {item.id}
    </td>
    <td className="hidden lg:flex items-center md:justify-center md:gap-4 py-1 border-r border-gray-600">
      <Image
        src={item.img || "/noAvatar.png"}
        alt=""
        width={40}
        height={40}
        className="w-9 h-9 rounded-full object-cover"
      />
    </td>
    {/*<td className="hidden md:table-cell pl-2 border-r border-gray-600">*/}
    {/*  {item.lastName} {item.firstName[0]} {item.surName ? item.surName[0] : ""}*/}
    {/*</td>*/}
    <td className="hidden md:table-cell pl-2 border-r border-gray-600">
      {item.username}
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
    <td className="hidden lg:table-cell pl-2 border-r border-gray-600">
      {item.email}
    </td>
    <td className="hidden lg:table-cell pl-2 border-r border-gray-600">
      {item.password}
    </td>
    <td className="hidden lg:table-cell pl-2 border-r border-gray-600">
      {item.phone}
    </td>
    <td className="hidden lg:table-cell text-center border-r border-gray-600">
      {item.department}
    </td>
    <td className="hidden lg:table-cell text-center border-r border-gray-600">
      {item.position}
    </td>
    <td className="hidden lg:table-cell text-center border-r border-gray-600">
      {item.stateStatus === "contract"
        ? "Штатный сотрудник"
        : "Договор подряда"}
    </td>
    <td className="hidden lg:table-cell text-center border-r border-gray-600">
      {item.role}
    </td>
    <td className="hidden lg:table-cell text-center border-r border-gray-600">
      {new Intl.DateTimeFormat("ru-RU").format(item.createdAt)}{" "}
      {item.createdAt.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}
    </td>
    <td
      className={`hidden lg:table-cell text-center ${role === "ADMIN" && "border-r border-gray-600"}`}
    >
      {new Intl.DateTimeFormat("ru-RU").format(item.updatedAt)}{" "}
      {item.updatedAt.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}
    </td>
    {role === "ADMIN" && (
      <td>
        <div className="flex items-center justify-center gap-2">
          <Link href={`/list/users/${item.id}`}>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full focus:outline-none
             hover:bg-lime-700"
            >
              <svg className="w-8 h-8 p-[6px] flex fill-lime-500 hover:fill-gray-50">
                <use xlinkHref="/icon.svg#eye" width={20} height={20} />
              </svg>
            </button>
          </Link>
          <FormModal table="user" type="delete" id={item.id} />
        </div>
      </td>
    )}
  </tr>
);

const UserListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = await searchParams;
  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.UserWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.lastName = {
              contains: value,
              mode: "insensitive",
            };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.user.findMany({
      where: query,
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.user.count({ where: query }),
  ]);

  return (
    <>
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
            {role === "ADMIN" && <FormModal table="user" type="create" />}
          </div>
        </div>
      </div>
      {/*LIST*/}
      <div className=" flex-grow-[1] mt-3">
        <Table columns={columns} renderRow={renderRow} data={data} />
      </div>
      {/*PAGINATION*/}
      <Pagination page={p} count={count} />
    </>
  );
};

export default UserListPage;
