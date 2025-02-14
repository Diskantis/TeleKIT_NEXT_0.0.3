export type CardType = {
  id: string;
  heading: string;
  description: string;
};

export type ContainerProps = {
  containerId: string;
  items: Array<CardType>;
};

export type ColumnsType = {
  [name: string]: CardType[];
};
