"use client";

import React, {
  Dispatch,
  JSX,
  useActionState,
  useEffect,
  useState,
} from "react";
import dynamic from "next/dynamic";
import { Spin } from "antd";
import { deleteKit } from "@/lib/actions/actionsKit";
import { deleteEvent } from "@/lib/actions/actionsEvent";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FormContainerProps } from "@/components/FormContainer";

const deleteActionMap = {
  kit: deleteKit,
  user: deleteKit,
  recipient: deleteKit,
  event: deleteEvent,
};

// USE LAZY LOADING (DYNAMIC IMPORT FORM)
const UserForm = dynamic(() => import("@/components/forms/UserForm"), {
  loading: () => <Spin fullscreen />,
});
const RecipientForm = dynamic(
  () => import("@/components/forms/RecipientForm"),
  {
    loading: () => <Spin fullscreen />,
  },
);
const EventForm = dynamic(() => import("@/components/forms/EventForm"), {
  loading: () => <Spin fullscreen />,
});
const KitForm = dynamic(() => import("@/components/forms/KitForm"), {
  loading: () => <Spin fullscreen />,
});

const forms: {
  [key: string]: (
    setOpen: Dispatch<React.SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any,
  ) => JSX.Element;
} = {
  kit: (setOpen, type, data, relatedData) => (
    <KitForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  event: (setOpen, type, data, relatedData) => (
    <EventForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  user: (setOpen, type, data, relatedData) => (
    <UserForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  recipient: (setOpen, type, data, relatedData) => (
    <RecipientForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
};

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerProps & { relatedData?: any }) => {
  let tableName = "";

  switch (table) {
    case "user":
      tableName = "этого пользователя";
      break;
    case "recipient":
      tableName = "этого получателя";
      break;
    case "kit":
      tableName = "этот комплект";
      break;
    default:
      break;
  }

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
    const [state, formAction] = useActionState(deleteActionMap[table], {
      success: false,
      error: false,
    });

    const router = useRouter();

    useEffect(() => {
      if (state.success) {
        toast("Комплект удален успешно!");
        setOpen(false);
        router.refresh();
      }
    }, [state]);

    return type === "delete" && id ? (
      <form action={formAction} className="p-4 flex flex-col gap-4">
        <input type="text | number" name="id" value={id} hidden readOnly />
        <span className="text-center font-medium">
          Все данные будут потеряны. Вы действительно хотите удалить {tableName}
          ?
        </span>
        <div className="flex gap-4 items-center justify-center">
          <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
            Удалить
          </button>
        </div>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](setOpen, type, data, relatedData)
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
