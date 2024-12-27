import React from "react";

const UserCard = ({ type }: { type: string }) => {
  return (
    <div className="rounded-2xl odd:bg-gray-800 even:bg-gray-700 p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-gray-600 px-2 py-1 rounded-full text-green-500">
          2024/25
        </span>
        <svg
          className="w-6 h-5 mr-2 hiddenjustify-center fill-gray-300
             xs:flex lg:hidden 2xl:flex"
        >
          <use xlinkHref="/icon.svg#more" width={20} height={20} />
        </svg>
      </div>
      <h1 className="text-2xl font-semibold my-4">1,234</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
    </div>
  );
};

export default UserCard;
