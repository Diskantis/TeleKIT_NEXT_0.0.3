const KitEquipmentsList = ({
  children,
  provided,
}: {
  children: any;
  provided: any;
}) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.droppableProps}
      className="min-w-[180px] h-full min-h-[calc(100vh - 230px)] flex flex-col items-center overflow-y-auto scrollbar"
    >
      {children}
    </div>
  );
};

export default KitEquipmentsList;
