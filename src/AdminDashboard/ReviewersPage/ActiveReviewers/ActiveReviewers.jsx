//ActiveReviewers.jsx
import  {  useMemo, useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { FiMoreHorizontal, FiUsers } from "react-icons/fi";
import axios from "axios";

const ActiveReviewers = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  useEffect(() => {
    const fetchActiveReviewers = async () => {
      try {
        const res = await axios.get("https://t4hxj7p8-5000.inc1.devtunnels.ms/api/reviewers-active");
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch active reviewers", err);
      }
    };
    fetchActiveReviewers();
  }, []);


  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "reviewerName", // still needed for sorting/filtering
      
      },
      {
        header: "Paper ID",
        accessorKey: "pdfFileId",
      },
      {
        header: "Papers Assigned",
        accessorKey: "paperTitle",
      },
      {
        header: "Review Deadline",
        accessorKey: "reviewDeadline",
        cell: ({ getValue }) => {
          const dateValue = getValue();
          if (!dateValue) return '-';
          
          return new Date(dateValue).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'Asia/Kolkata'
          });
        },
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
    data: data,
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
          <FiUsers /> Active Reviewers
        </h3>
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

export default ActiveReviewers;
