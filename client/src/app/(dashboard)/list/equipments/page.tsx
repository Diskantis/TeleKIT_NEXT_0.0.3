import React from "react";

import { Prisma, Equipment, EquipmentComments } from "@prisma/client";
import prisma from "@/lib/prisma";
import { role } from "@/lib/utils";
import { ITEM_PER_PAGE } from "@/lib/settings";

import Link from "next/link";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import FormModal from "@/components/FormModal";

type EquipmentList = Equipment & {
  equipmentComments: EquipmentComments[];
};

const columns = [
  {
    header: "#",
    accessor: "info",
    className:
      "table-cell py-2 px-2 text-center border-r border-gray-600 rounded-tl-md",
  },
  {
    header: "Фото",
    accessor: "img",
    className: "hidden text-center lg:table-cell border-r border-gray-600",
  },
  {
    header: "Категория",
    accessor: "categoryId",
    className: `hidden pl-2 md:table-cell border-r border-gray-600`,
  },
  {
    header: "Подкатегория 1",
    accessor: "subCategoryLevel1Id",
    className: `hidden pl-2 md:table-cell border-r border-gray-600`,
  },
  {
    header: "Подкатегория 2",
    accessor: "subCategoryLevel2Id",
    className: `hidden pl-2 md:table-cell border-r border-gray-600`,
  },
  {
    header: "Название",
    accessor: "name",
    className: `hidden pl-2 md:table-cell border-r border-gray-600`,
  },
  {
    header: "Модель",
    accessor: "model",
    className: `hidden pl-2 md:table-cell border-r border-gray-600`,
  },
  {
    header: "Фирма",
    accessor: "company",
    className: `hidden text-center pl-2 md:table-cell border-r border-gray-600`,
  },
  {
    header: "Описание",
    accessor: "description",
    className: `hidden text-center pl-2 md:table-cell border-r border-gray-600`,
  },
  {
    header: "Серийный номер",
    accessor: "serialNumber",
    className: `hidden text-center pl-2 md:table-cell border-r border-gray-600`,
  },
  {
    header: "Инвентарный номер",
    accessor: "inventoryNumber",
    className: `hidden text-center pl-2 md:table-cell border-r border-gray-600`,
  },
  {
    header: "Комплект",
    accessor: "kitId",
    className: `hidden text-center pl-2 md:table-cell border-r border-gray-600`,
  },
  {
    header: "Дата поступления",
    accessor: "datePurchase",
    className: `hidden pl-2 md:table-cell border-r border-gray-600`,
  },
  {
    header: "Статус оборудования",
    accessor: "statusEmployment",
    className: `hidden pl-2 md:table-cell border-r border-gray-600`,
  },
  // {
  //   header: "Примечания",
  //   accessor: "equipmentComments",
  //   className: `hidden pl-2 md:table-cell border-r border-gray-600`,
  // },
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

const renderRow = (item: EquipmentList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 text-sm text-gray-300 hover:bg-[#08334468]"
  >
    <td className="hidden md:table-cell text-center border-r border-gray-600">
      {item.id}
    </td>
    <td className="hidden pl-2 md:table-cell border-r border-gray-600">
      {item.img}
    </td>
    <td className="hidden pl-2 md:table-cell border-r border-gray-600">
      {item.categoryId}
    </td>
    <td className="hidden pl-2 md:table-cell text-center border-r border-gray-600">
      {item.subCategoryLevel1Id}
    </td>
    <td className="hidden pl-2 md:table-cell text-center border-r border-gray-600">
      {item.subCategoryLevel2Id}
    </td>
    <td className="hidden pl-2 md:table-cell text-center border-r border-gray-600">
      {item.name}
    </td>
    <td className="hidden pl-2 md:table-cell text-center border-r border-gray-600">
      {item.model}
    </td>
    <td className="hidden pl-2 md:table-cell border-r border-gray-600">
      {item.company}
    </td>
    <td className="hidden pl-2 md:table-cell border-r border-gray-600">
      {/*{item.company}*/}
    </td>
    <td className="hidden pl-2 md:table-cell border-r border-gray-600">
      {item.serialNumber}
    </td>
    <td className="hidden pl-2 md:table-cell border-r border-gray-600">
      {item.inventoryNumber}
    </td>
    <td className="hidden pl-2 md:table-cell border-r border-gray-600">
      {item.kitId}
    </td>
    <td className="hidden pl-2 md:table-cell border-r border-gray-600">
      {item.datePurchase}
    </td>
    <td className="hidden lg:table-cell text-center border-r border-gray-600">
      {item.statusEmployment === "free"
        ? "свободно"
        : item.statusEmployment === "work"
          ? "в работе"
          : "в ремонте"}
    </td>
    {/*<td className="hidden md:table-cell border-r border-gray-600">*/}
    {/*  {item.equipmentComments.map((eqipcomm) => eqipcomm.comment).join(", ")}*/}
    {/*</td>*/}
    <td
      className={`hidden lg:table-cell text-center ${role === "admin" && "border-r border-gray-600"}`}
    >
      {new Intl.DateTimeFormat("ru-RU").format(item.createdAt)}{" "}
      {item.createdAt.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}
    </td>
    {role === "admin" && (
      <td>
        <div className="flex items-center justify-center gap-2">
          <Link href={`/list/equipments/${item.id}`}>
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

const EquipmentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = await searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION
  const query: Prisma.EquipmentWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.equipment.findMany({
      where: query,
      include: {
        equipmentComments: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.event.count(),
  ]);

  return (
    <div className="h-full flex flex-col justify-between bg-gray-900 mr-4 p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-2xl font-semibold">Оборудование</h1>
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
    </div>
  );
};

export default EquipmentListPage;
