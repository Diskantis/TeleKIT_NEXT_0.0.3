"use client";

import { useState } from "react";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { ColumnsType } from "@/components/DnD/Types";

import KitContainer from "@/components/DnD/KitContainer";

const Storage = [
  {
    id: "1",
    heading: "Heading 1",
    description: "Card 1",
  },
  {
    id: "2",
    heading: "Heading 2",
    description: "Card 2",
  },
  {
    id: "3",
    heading: "Heading 3",
    description: "Card 3",
  },
];

const Kit = [
  {
    id: "4",
    heading: "Heading 4",
    description: "Card 4",
  },
  {
    id: "5",
    heading: "Heading 5",
    description: "Card 5",
  },
];

const KitDnDBoard = () => {
  const [items, setItems] = useState<ColumnsType>({ Storage, Kit });

  const [_, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function findContainer(id: UniqueIdentifier) {
    if (id in items) {
      return id;
    }
    return Object.keys(items).find((key) => {
      return items[key].some((item) => item.id === id);
    });
  }

  function handleDragStart(event: DragStartEvent) {
    const activeId = event.active.id;
    setActiveId(activeId);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    const activeId = active.id;
    const overId = over!.id;
    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((items) => {
      const activeItems = items[activeContainer];
      const overItems = items[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems?.findIndex(
        (item) => item.id === activeId,
      );
      const overIndex = overItems?.findIndex((item) => item.id === overId);
      let newIndex: number;
      if (overId in items) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }
      return {
        ...items,
        [activeContainer]: items[activeContainer].filter(
          (item: any) => item.id !== active.id,
        ),
        [overContainer]: [
          ...items[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...items[overContainer].slice(newIndex, items[overContainer].length),
        ],
      };
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const activeId = active.id;
    const overId = over!.id;
    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer]?.findIndex(
      (item) => item.id === activeId,
    );
    const overIndex = items[overContainer].findIndex(
      (item) => item.id === overId,
    );

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex,
        ),
      }));
    }
    setActiveId(null);
  }

  return (
    <div className="p-4">
      <div className="flex gap-8">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="w-full flex flex-col">
            <div className="w-full h-[30px] bg-cyan-950 border-b-2 rounded-t-md mb-3"></div>
            <div className="flex flex-row gap-2">
              <div className="w-1/2 bg-gray-700 rounded-md">
                <h2 className="text-xl text-center font-semibold mt-2">
                  Комплект
                </h2>
                <form>
                  <div className="h-[calc(100vh-292px)] flex flex-col justify-between p-2">
                    <div className="flex flex-row">
                      <div className="w-1/4 flex flex-col pr-2 gap-2">
                        <div className="flex flex-col gap-2 ">
                          <label className="text-sm text-gray-400">
                            Закрепить получателя
                          </label>
                        </div>
                      </div>
                      <div className="w-3/4 flex flex-col pl-2 gap-2">
                        <KitContainer
                          key={"Storage"}
                          containerId={"Storage"}
                          items={items["Storage"]}
                        />
                      </div>
                    </div>
                    <button className="bg-blue-400 text-white mt-2 p-2 rounded-md">
                      Создать
                    </button>
                  </div>
                </form>
              </div>
              <div className="w-1/2 bg-gray-700 rounded-md">
                <h2 className="text-xl text-center font-semibold mt-2">
                  Склад
                </h2>
                <div className="p-2">
                  <KitContainer
                    key={"Kit"}
                    containerId={"Kit"}
                    items={items["Kit"]}
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-[30px] bg-cyan-950 border-t-2 rounded-b-md mt-3"></div>
          </div>
        </DndContext>
      </div>
    </div>
  );
};

export default KitDnDBoard;
