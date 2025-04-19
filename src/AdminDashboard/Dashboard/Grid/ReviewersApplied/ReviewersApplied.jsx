import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { FiMoreHorizontal } from "react-icons/fi";
import { TbUsersPlus } from "react-icons/tb";
import axios from "axios";
import ReviewerActionDialog from "../../../ReviewerActionDialog/ReviewerActionDialog";
import { format } from "date-fns";

const ReviewersApplied = () => {
  const [reviewers, setReviewers] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [selectedReviewerData, setSelectedReviewerData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://t4hxj7p8-5000.inc1.devtunnels.ms/api/reviewers-applied")
      .then((res) => {
        setReviewers(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch reviewers:", err);
      });
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
        header: "Degree",
        accessorKey: "degree",
      },
      {
        header: "Applied Date",
        accessorKey: "appliedDate",
        cell: ({ row }) => {
          const appliedDate = row.original.appliedDate;
          return appliedDate ? format(new Date(appliedDate), "MM/dd/yyyy") : "N/A";
        },
      },
      {
        header: "Designation",
        accessorKey: "designation",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <button
            className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8"
            onClick={() => {
              setSelectedReviewerData(row.original); // Pass full reviewer object
              setIsDialogOpen(true);
            }}
          >
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
          <TbUsersPlus /> Reviewers Applied
        </h3>
        <button className="text-sm cursor-pointer hover:underline">
          See all
        </button>
      </div>

      <table className="w-full table-auto border border-stone-300 border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="text-sm font-normal text-stone-500">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="text-start p-1.5">
                  {flexRender(header.column.columnDef.header, header.getContext())}
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
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="text-sm px-3 py-1 rounded border disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Action Dialog */}
      <ReviewerActionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        reviewerData={selectedReviewerData} // pass full reviewer object
        onDecision={(decision, formData) => {
          console.log(`Reviewer ${formData.firstName} has been ${decision}`);
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
};

export default ReviewersApplied;
