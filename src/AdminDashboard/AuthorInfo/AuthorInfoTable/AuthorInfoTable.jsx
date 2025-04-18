import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {  FiUsers } from "react-icons/fi";

const AuthorInfoTable = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    axios.get("https://t4hxj7p8-5000.inc1.devtunnels.ms/api/auth/authors")
      .then((res) => {
        // Map response to include submissions and publications as "Null"
        const formatted = res.data.map((author) => ({
          ...author,
          submissions: "Null",
          publications: "Null",
        }));
        setData(formatted);
      })
      .catch((err) => console.error("Error fetching authors:", err));
  }, []);

  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "fullName",
        cell: ({ row }) => {
          const { name } = row.original;
          return name || "N/A";
        },
      },
      {
        header: "Submissions",
        accessorKey: "submissions",
        cell: () => "Null",
      },
      {
        header: "Publications",
        accessorKey: "publications",
        cell: () => "Null",
      },
      {
        header: "Designation",
        accessorKey: "designation",
        cell: ({ row }) => row.original.designation || "N/A",
      },
      {
        id: "actions",
        header: "Actions",
        cell: () => (
          <Link
            to="/profile" 
            className="text-blue-600 hover:underline text-sm"
          >
            Visit Profile 👤
          </Link>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300 mt-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiUsers /> Authors
        </h3>
        <button className="text-sm cursor-pointer hover:underline">
          See all
        </button>
      </div>

      <table className="w-full table-auto border border-stone-300 border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="text-sm font-normal text-stone-500"
            >
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="text-start p-1.5">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={(index + 1) % 2 ? "bg-stone-300 text-sm" : "text-sm"}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-1.5 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-end items-center gap-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="text-sm px-3 py-1 rounded border disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="text-sm px-3 py-1 rounded border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AuthorInfoTable;
