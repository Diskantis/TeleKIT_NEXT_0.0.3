"use client";

import React, { JSX } from "react";

import dynamic from "next/dynamic";
import { CreateFormContainerProps } from "@/components/CreateFormContainer";
import { Spin } from "antd";

// USE LAZY LOADING (DYNAMIC IMPORT FORM)
const KitCreateForm = dynamic(
  () => import("@/components/forms/KitCreateForm"),
  {
    loading: () => <Spin fullscreen />,
  },
);
const KitCreateFormDND = dynamic(
  () => import("@/components/forms/KitCreateFormDND"),
  {
    loading: () => <Spin fullscreen />,
  },
);

const forms: {
  [key: string]: (
    type: "create" | "update",
    data?: any,
    relatedData?: any,
  ) => JSX.Element;
} = {
  kit: (type, data, relatedData) => (
    <KitCreateForm type={type} data={data} relatedData={relatedData} />
  ),
};

const CreateForm = ({
  table,
  type,
  data,
  id,
  relatedData,
}: CreateFormContainerProps & { relatedData?: any }) => {
  return type === "create" || type === "update"
    ? forms[table](type, data, relatedData)
    : "Form not found!";
};

export default CreateForm;
