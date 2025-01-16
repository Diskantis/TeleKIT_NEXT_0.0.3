import { DroppableProvided } from "@hello-pangea/dnd";

const KitEquipmentsList = ({
  children,
  provided,
}: {
  children: any;
  provided: DroppableProvided;
}) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.droppableProps}
      className="min-w-[180px] min-h-[calc(100vh - 230px)] flex flex-col items-center overflow-y-auto scrollbar"
    >
      {children}
    </div>
  );
};

export default KitEquipmentsList;
