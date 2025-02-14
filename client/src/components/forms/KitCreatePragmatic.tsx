"use client";

import { useState } from "react";
import { Column as ColumnType, Task } from "@/components/DnD_1/types";
import Column from "@/components/DnD_1/Column";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

const KitCreatePragmatic = () => {
  const TodoColumn = { id: "TODO", title: "To Do" };
  const InProgressColumn = { id: "IN PROGRESS", title: "In Progress" };
  const DoneColumn = { id: "DONE", title: "Done" };

  const INITIAL_TASKS: Task[] = [
    {
      id: "1",
      title: "Research Project",
      description: "Gather requirements and create initial documentation",
      status: "TODO",
    },
    {
      id: "2",
      title: "Design System",
      description: "Create component library and design tokens",
      status: "TODO",
    },
    {
      id: "3",
      title: "API Integration",
      description: "Implement REST API endpoints",
      status: "IN PROGRESS",
    },
    {
      id: "4",
      title: "Testing",
      description: "Write unit tests for core functionality",
      status: "DONE",
    },
  ];

  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  return (
    <div className="p-4">
      <div className="flex gap-8">
        <DndContext onDragEnd={handleDragEnd}>
          <Column
            column={TodoColumn}
            tasks={tasks.filter((task) => task.status === "TODO")}
          />
          <Column
            column={InProgressColumn}
            tasks={tasks.filter((task) => task.status === "IN PROGRESS")}
          />
          <Column
            column={DoneColumn}
            tasks={tasks.filter((task) => task.status === "DONE")}
          />
        </DndContext>
      </div>
    </div>
  );
};

export default KitCreatePragmatic;
