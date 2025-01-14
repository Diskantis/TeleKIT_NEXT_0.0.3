import React from "react";

import { Prisma, Kit, Equipment, Recipient } from "@prisma/client";
import prisma from "@/lib/prisma";
import { role } from "@/lib/utils";
import { ITEM_PER_PAGE } from "@/lib/settings";

import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import FormContainer from "@/components/FormContainer";

type KitList = Kit & { updatedAt: Date } & { recipients: Recipient[] } & {
  equipments: Equipment[];
};

const columns = [
  {
    header: "#",
    accessor: "info",
    className:
      "table-cell py-2 px-2 text-center border-r border-gray-600 rounded-tl-md",
  },
  {
    header: "Название комплекта",
    accessor: "name",
    className: "hidden pl-2 md:table-cell border-r border-gray-600",
  },
  {
    header: "Оборудование",
    accessor: "equipments",
    className: "hidden pl-2 md:table-cell border-r border-gray-600",
  },
  {
    header: "Получатель",
    accessor: "recipients",
    className: "hidden pl-2 md:table-cell border-r border-gray-600",
  },
  // {
  //   header: "Событие",
  //   accessor: "eventId",
  //   className: "hidden pl-2 md:table-cell border-r border-gray-600",
  // },
  {
    header: "Дата формирования",
    accessor: "updatedAt",
    className: `hidden text-center xl:table-cell rounded-tr-md ${
      (role === "admin" || role === "user") &&
      "rounded-tr-none border-r border-gray-600"
    }`,
  },
  ...(role === "admin" || role === "user"
    ? [
        {
          header: "",
          accessor: "action",
          className: "hidden text-center xl:table-cell rounded-tr-md",
        },
      ]
    : []),
];

const renderRow = (item: KitList) => (
  <tr
    key={item.name}
    className="h-[35px] border-b border-gray-200 text-sm text-gray-300 hover:bg-[#08334468]"
  >
    <td className="hidden md:table-cell text-center border-r border-gray-600">
      {item.id}
    </td>
    <td className="hidden md:table-cell pl-2 border-r border-gray-600">
      {item.name}
    </td>
    <td className="max-w-[300px] overflow-ellipsis overflow-hidden whitespace-nowrap hidden md:table-cell pl-2 border-r border-gray-600">
      {item.equipments.map((equip) => equip.name).join(", ")}
    </td>
    <td className="max-w-[300px] overflow-ellipsis overflow-hidden whitespace-nowrap hidden md:table-cell pl-2 border-r border-gray-600">
      {item.recipients
        .map((recipient) =>
          recipient.surName
            ? `${recipient.lastName} ${recipient.firstName[0]}.${recipient.surName[0]}.`
            : `${recipient.lastName} ${recipient.firstName[0]}.`,
        )
        .join(", ")}
    </td>
    {/*<td className="hidden md:table-cell pl-2 border-r border-gray-600">*/}
    {/*  {item.eventId}*/}
    {/*</td>*/}
    <td
      className={`hidden lg:table-cell text-center ${(role === "admin" || role === "user") && "border-r border-gray-600"}`}
    >
      {new Intl.DateTimeFormat("ru-RU").format(item.updatedAt)}{" "}
      {item.updatedAt.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}
    </td>
    {(role === "admin" || role === "user") && (
      <td>
        <div className="flex items-center justify-center gap-2">
          <FormContainer table="kit" type="update" data={item} />
          <FormContainer table="kit" type="delete" id={item.id} />
        </div>
      </td>
    )}
  </tr>
);

const KitListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = await searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION
  const query: Prisma.KitWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.name = {
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
    prisma.kit.findMany({
      where: query,
      include: {
        recipients: true,
        equipments: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.kit.count({ where: query }),
  ]);

  return (
    <div className="h-full flex flex-col justify-between bg-gray-900 mr-4 p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-2xl font-semibold">Комплекты</h1>
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
            {(role === "admin" || role === "user") && (
              <FormContainer table="kit" type="create" />
            )}
          </div>
        </div>
      </div>
      {/*LIST*/}
      <div className=" flex-grow-[1] mt-3">
        <Table columns={columns} renderRow={renderRow} data={data} />
      </div>
      {/*PAGINATION*/}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default KitListPage;
