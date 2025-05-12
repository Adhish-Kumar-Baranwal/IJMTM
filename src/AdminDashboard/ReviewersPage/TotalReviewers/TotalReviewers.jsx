import React, { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { FiMoreHorizontal, FiUsers } from "react-icons/fi";

const TotalReviewers = () => {
  const [reviewers, setReviewers] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  useEffect(() => {
    const fetchReviewers = async () => {
      try {
        const res = await fetch("https://t4hxj7p8-5000.inc1.devtunnels.ms/api/reviewers-approved");
        const data = await res.json();
        setReviewers(data);
      } catch (error) {
        console.error("Failed to fetch approved reviewers:", error);
      }
    };

    fetchReviewers();
  }, []);

  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "firstName",
        cell: ({ row }) => {
          const { firstName, lastName } = row.original;
          return `${firstName} ${lastName}`;
        },
      },
      {
        header: "Reviews Done",
        accessorKey: "reviewsDone",
      },
      {
        header: "Designation",
        accessorKey: "designation",
      },
      {
        header: "Experience (in years)",
        accessorKey: "experience",
        size: 50,
      },
      {
        id: "actions",
        header: "Actions",
        cell: () => (
          <button className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8">
            <FiMoreHorizontal />
          </button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: reviewers,
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
          <FiUsers /> Total Reviewers
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

export default TotalReviewers;
