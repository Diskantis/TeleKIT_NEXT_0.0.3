"use client";

import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";

import { kitSchema, KitSchema } from "@/lib/formValidationSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createKit, updateKit } from "@/lib/actions/actionsKit";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import InputField from "@/components/elements/InputField";
import TableSearch from "@/components/TableSearch";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import KitEquipmentCard from "@/components/DnD/temp/KitEquipmentCard";
import KitEquipmentsList from "@/components/DnD/temp/KitEquipmentsList";
import KitEquipmentsContainer from "@/components/DnD/temp/KitEquipmentsContainer";

const monday = {
  name: "Оборудование в комплекте",
  items: [
    {
      id: "1",
      name: "ТЖК 1",
      timeIn: "09:00",
      timeOut: "18:00",
      operator: "Автухов А.А.",
    },
    {
      id: "2",
      name: "ТЖК 2",
      timeIn: "09:00",
      timeOut: "18:00",
      operator: "Зонов А.А.",
    },
  ],
};

const tuesday = {
  name: "Оборудование",
  items: [
    {
      id: "3",
      name: "ТЖК 3",
      timeIn: "09:00",
      timeOut: "18:00",
      operator: "Шаплов А.А.",
    },
    {
      id: "4",
      name: "ТЖК 4",
      timeIn: "09:00",
      timeOut: "18:00",
      operator: "Андрушкевич А.А.",
    },
    {
      id: "5",
      name: "ТЖК 5",
      timeIn: "09:00",
      timeOut: "18:00",
      operator: "Гончарик А.А.",
    },
  ],
};

const taskStatus = {
  monday: {
    name: "Оборудование в комплекте",
    items: [
      {
        id: "1",
        name: "ТЖК 1",
        timeIn: "09:00",
        timeOut: "18:00",
        operator: "Автухов А.А.",
      },
    ],
  },
  tuesday: {
    name: "Оборудование",
    items: [
      {
        id: "2",
        name: "ТЖК 2",
        timeIn: "09:00",
        timeOut: "18:00",
        operator: "Зонов А.А.",
      },
      {
        id: "3",
        name: "ТЖК 3",
        timeIn: "09:00",
        timeOut: "18:00",
        operator: "Шаплов А.А.",
      },
      {
        id: "4",
        name: "ТЖК 4",
        timeIn: "09:00",
        timeOut: "18:00",
        operator: "Андрушкевич А.А.",
      },
      {
        id: "5",
        name: "ТЖК 5",
        timeIn: "09:00",
        timeOut: "18:00",
        operator: "Гончарик А.А.",
      },
    ],
  },
};

const onDragEnd = (result: any, columns: any, setColumns: any) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const KitCreateForm = ({
  type,
  data,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<KitSchema>({
    resolver: zodResolver(kitSchema),
  });

  const [state, formAction] = useActionState(
    type === "create" ? createKit : updateKit,
    {
      success: false,
      error: false,
    },
  );

  const onSubmit = handleSubmit((data) => {
    startTransition(() => formAction(data));
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(
        `${type === "create" ? "Создание нового комплекта" : "Изменение комплекта"} успешно!`,
      );
      // router.refresh();
      router.push("/list/kits");
    }
  }, [state]);

  // const { recipients } = relatedData;

  const [columns, setColumns] = useState(taskStatus);

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl text-slate-300 font-semibold">
          {type === "create"
            ? "Создание нового комплекта"
            : "Изменение комплекта"}
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
        </div>
      </div>
      {/*WORK AREA*/}
      <div className="w-full flex flex-col">
        <div className="w-full h-[30px] bg-cyan-950 border-b-2 rounded-t-md mb-3"></div>
        <div className="flex flex-row"></div>
        <div className="w-full h-[30px] bg-cyan-950 border-t-2 rounded-b-md mt-3"></div>
      </div>
    </>
  );
};

export default KitCreateForm;
