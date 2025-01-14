import React from "react";
import { role } from "@/lib/utils";

const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <table className="w-full">
      <thead className="border-b-2 border-gray-200">
        <tr className="text-left text-gray-200 text-sm font-semibold bg-cyan-950">
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
          {role === "admin" && <th className="rounded-tr-md"></th>}
        </tr>
      </thead>
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
