import React from "react";

import { Prisma, Event, Kit, Recipient } from "@prisma/client";
import prisma from "@/lib/prisma";
import { role } from "@/lib/utils";
import { ITEM_PER_PAGE } from "@/lib/settings";

import Link from "next/link";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import FormModal from "@/components/FormModal";

type EventList = Event & { recipients: Recipient[] } & { kits: Kit[] };

const columns = [
  {
    header: "#",
    accessor: "info",
    className:
      "table-cell py-2 px-2 text-center border-r border-gray-600 rounded-tl-md",
  },
  {
    header: "Название",
    accessor: "title",
    className: `hidden pl-2 md:table-cell border-r border-gray-600`,
  },
  {
    header: "День",
    accessor: "day",
    className: `hidden pl-2 md:table-cell border-r border-gray-600`,
  },
  {
    header: "Дата начала",
    accessor: "startDate",
    className: `hidden text-center pl-2 md:table-cell border-r border-gray-600`,
  },
  {
    header: "Время начала",
    accessor: "startTime",
    className: `hidden text-center pl-2 md:table-cell border-r border-gray-600`,
  },
  {
    header: "Дата окончания",
    accessor: "endDate",
    className: `hidden text-center pl-2 md:table-cell border-r border-gray-600`,
  },
  {
    header: "Время окончания",
    accessor: "endTime",
    className: `hidden text-center pl-2 md:table-cell border-r border-gray-600`,
  },
  {
    header: "Получатели оборудования",
    accessor: "recipients",
    className: `hidden pl-2 md:table-cell border-r border-gray-600`,
  },
  {
    header: "Комплекты",
    accessor: "kits",
    className: `hidden pl-2 md:table-cell border-r border-gray-600`,
  },
  {
    header: "Дата формирования",
    accessor: "updatedAt",
    className: `hidden text-center xl:table-cell rounded-tr-md ${
      role === "admin" && "rounded-tr-none border-r border-gray-600"
    }`,
  },
  ...(role === "admin"
    ? [
        {
          header: "",
          accessor: "action",
          className: "hidden text-center xl:table-cell rounded-tr-md",
        },
      ]
    : []),
];

const renderRow = (item: EventList) => (
  <tr
    key={item.title}
    className="border-b border-gray-200 text-sm text-gray-300 hover:bg-[#08334468]"
  >
    <td className="hidden md:table-cell text-center border-r border-gray-600">
      {item.id}
    </td>
    <td className="hidden pl-2 md:table-cell border-r border-gray-600">
      {item.title}
    </td>
    <td className="hidden pl-2 md:table-cell border-r border-gray-600">
      {item.day}
    </td>
    <td className="hidden pl-2 md:table-cell text-center border-r border-gray-600">
      {new Intl.DateTimeFormat("ru-RU").format(item.startDate)}
    </td>
    <td className="hidden pl-2 md:table-cell text-center border-r border-gray-600">
      {item.startTime.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}
    </td>
    <td className="hidden pl-2 md:table-cell text-center border-r border-gray-600">
      {new Intl.DateTimeFormat("ru-RU").format(item.endDate)}
    </td>
    <td className="hidden pl-2 md:table-cell text-center border-r border-gray-600">
      {item.endTime.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}
    </td>
    <td className="hidden pl-2 md:table-cell border-r border-gray-600">
      {item.recipients.map((recipient) => recipient.username).join(", ")}
    </td>
    <td className="hidden pl-2 md:table-cell border-r border-gray-600">
      {item.kits.map((kit) => kit.name).join(", ")}
    </td>
    <td
      className={`hidden lg:table-cell text-center ${role === "admin" && "border-r border-gray-600"}`}
    >
      {new Intl.DateTimeFormat("ru-RU").format(item.updatedAt)}{" "}
      {item.updatedAt.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}
    </td>
    {role === "admin" && (
      <td>
        <div className="flex items-center justify-center gap-2">
          <Link href={`/schedule/events/${item.id}`}>
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

const EventListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = await searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION
  const query: Prisma.EventWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.title = {
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
    prisma.event.findMany({
      where: query,
      include: {
        recipients: true,
        kits: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.event.count({ where: query }),
  ]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-2xl font-semibold">События</h1>
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
            {role === "admin" && <FormModal table="user" type="create" />}
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

export default EventListPage;
