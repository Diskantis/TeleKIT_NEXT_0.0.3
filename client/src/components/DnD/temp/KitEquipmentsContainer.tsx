import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

import KitEquipmentsList from "@/components/DnD/temp/KitEquipmentsList";
import KitEquipmentCard from "@/components/DnD/temp/KitEquipmentCard";

type Items = {
  id: string;
  name: string;
  timeIn: string;
  timeOut: string;
  operator: string;
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
      {
        id: "2",
        name: "ТЖК 2",
        timeIn: "09:00",
        timeOut: "18:00",
        operator: "Зонов А.А.",
      },
    ],
  },
  tuesday: {
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
  },
  wednesday: {
    name: "Среда",
    items: [
      {
        id: "6",
        name: "ТЖК 6",
        timeIn: "09:00",
        timeOut: "18:00",
        operator: "Шаплов А.А.",
      },
      {
        id: "7",
        name: "ТЖК 7",
        timeIn: "09:00",
        timeOut: "18:00",
        operator: "Андрушкевич А.А.",
      },
      {
        id: "8",
        name: "ТЖК 8",
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

const KitEquipmentsContainer = () => {
  const [columns, setColumns] = useState(taskStatus);
  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      {Object.entries(columns).map(([columnId, column]) => (
        <div
          key={columnId}
          className="w-[215px] h-[calc(100vh - 165px)] flex flex-col items-center bg-[#252424] border-[1px] 
          border-slate-950 rounded-md p-2"
        >
          <div className="w-[80%] flex justify-center border-b-[1px] border-b-gray-500 pb-1 mb-2">
            <div className="text-xl">{column.name}</div>
          </div>
          <Droppable droppableId={columnId} key={columnId}>
            {(provided) => (
              <KitEquipmentsList provided={provided}>
                {column.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <KitEquipmentCard
                        item={item}
                        provided={provided}
                        snapshot={snapshot}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </KitEquipmentsList>
            )}
          </Droppable>
        </div>
      ))}
    </DragDropContext>
  );
};

export default KitEquipmentsContainer;
