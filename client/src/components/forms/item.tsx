const Item = ({ item }: { item: any }) => {
  return (
    <div>
      {item.id} {item.name}
    </div>
  );
};

export default Item;
