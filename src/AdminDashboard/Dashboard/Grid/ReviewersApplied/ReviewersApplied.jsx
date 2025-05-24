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
import "./ReviewersApplied.css"

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
//
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
            className="reviewers-applied-table-actions"
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
    <div className="reviewers-applied-container">
      <h3 className="reviewers-applied-table-title">
        <TbUsersPlus /> Reviewers Applied
      </h3>

      <table className="reviewers-applied-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="reviewers-applied-table-header">
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

  
      <div className="reviewers-table-btn-section">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="reviewers-table-prev-btn"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="reviewers-table-next-btn"
        >
          Next
        </button>
      </div>

      
      <ReviewerActionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        reviewerData={selectedReviewerData} 
        onDecision={(decision, formData) => {
          console.log(`Reviewer ${formData.firstName} has been ${decision}`);
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
};

export default ReviewersApplied;
