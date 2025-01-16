const KitEquipmentCard = ({
  item,
  snapshot,
  provided,
}: {
  item: any;
  snapshot: any;
  provided: any;
}) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`max-w-[170px] flex flex-col items-center border-[1px] border-gray-500 p-1 gap-1 my-1 mb-2 select-none
      ${snapshot.isDragging ? "bg-[#646464]" : "bg-[#3f3f3f]"}`}
    >
      <div className="w-[150px] text-center border-b-[1px] border-b-gray-300">
        {item.name}
      </div>
      <div className="w-[170px] flex justify-around">
        <span>{item.timeIn}</span>
        <span> - </span>
        <span>{item.timeOut}</span>
      </div>
      <p>{item.operator}</p>
    </div>
  );
};

export default KitEquipmentCard;
