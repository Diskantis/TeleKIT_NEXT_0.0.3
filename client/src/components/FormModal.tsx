"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Spin } from "antd";

const UserForm = dynamic(() => import("@/components/forms/UserForm"), {
  // loading: () => <h1>Loading...</h1>,
  loading: () => <Spin fullscreen />,
});

const RecipientForm = dynamic(
  () => import("@/components/forms/RecipientForm"),
  {
    // loading: () => <h1>Loading...</h1>,
    loading: () => <Spin fullscreen />,
  },
);

const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  user: (type, data) => <UserForm type={type} data={data} />,
  recipient: (type, data) => <RecipientForm type={type} data={data} />,
};

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table: "user" | "recipient";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
}) => {
  const tableName = table === "user" ? "пользователя" : "получателя";
  const sizeIcon = type === "create" ? "32" : "20";

  const bgColor =
    type === "create"
      ? "rounded-full bg-orange-400"
      : type === "update"
        ? ""
        : "rounded-full focus:outline-none hover:bg-red-600";

  const iconColor =
    type === "create"
      ? "fill-slate-900"
      : type === "update"
        ? "px-[5px] pt-[6px] fill-gray-200 hover:fill-gray-500"
        : "px-[6px] pt-[6px] fill-red-600 hover:fill-gray-200";

  const [open, setOpen] = useState(false);

  const Form = () => {
    return type === "delete" && id ? (
      <form action="" className="p-4 flex flex-col gap-4">
        <span className="text-center font-medium">
          Все данные будут потеряны. Вы действительно хотите удалить этого{" "}
          {tableName}?
        </span>
        <div className="flex gap-4 items-center justify-center">
          <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
            Удалить
          </button>
          <button
            className="bg-blue-700 text-white py-2 px-4 rounded-md border-none w-max self-center"
            onClick={() => setOpen(false)}
          >
            Отмена
          </button>
        </div>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, data)
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        className={`w-8 h-8 flex items-center justify-center ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <svg className={`w-8 h-8 flex ${iconColor}`}>
          <use
            xlinkHref={`/icon.svg#${type}`}
            width={sizeIcon}
            height={sizeIcon}
          />
        </svg>
      </button>
      {open && (
        <div className="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-gray-800 p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <svg className="w-6 h-6 flex fill-gray-300 hover:fill-gray-500">
                <use xlinkHref={`/icon.svg#close`} width={24} height={24} />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
