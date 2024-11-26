import Image from "next/image";
import React from "react";

const TableSearch = () => {
  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
      <svg className="w-[14px] h-[14px] flex items-center justify-center fill-gray-500 ml-1">
        <use xlinkHref="/icon.svg#search" width={14} height={14} />
      </svg>
      <input
        type="text"
        placeholder="Поиск по таблице..."
        className="w-[200px] py-1 bg-transparent outline-none text-sm"
      />
    </div>
  );
};

export default TableSearch;
