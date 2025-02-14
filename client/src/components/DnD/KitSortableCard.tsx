"use client";

import React from "react";

import { CardType } from "@/components/DnD/Types";

import { useSortable } from "@dnd-kit/sortable";

function Card({ heading, description }: CardType) {
  return (
    <div className="w-full flex flex-col gap-2 rounded-md bg-white px-4 py-2 shadow-md">
      <p className="font-bold text-2xl text-black">{heading}</p>
      <p className="text-gray-900 font-medium">{description}</p>
    </div>
  );
}

const KitSortableCard = (props: CardType) => {
  const { id, heading, description } = props;
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${Math.round(transform.y)}px, 0) scaleX(${transform.scaleX})`
      : "",
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card id={id} heading={heading} description={description} />
    </div>
  );
};

export default KitSortableCard;
