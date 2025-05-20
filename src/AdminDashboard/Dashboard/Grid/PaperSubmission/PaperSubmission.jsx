//PaperSubmission.jsx
import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdOutlineDocumentScanner } from "react-icons/md";
import submissions from "../../../../../public/Jsonfolder/PaperSubmission.json";
import RowActionDialog from "../../../../components/RowActionDialog/RowActionDialog";
import "./PaperSubmission.css"

const PaperSubmission = () => {
  const data = useMemo(() => submissions, []);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const columns = useMemo(
    () => [
      {
        header: "Title",
        accessorKey: "title",
        cell: ({ row }) => (
          <a href="#" className="ppr-submit-title">
            {row.original.title}
          </a>
        ),
      },
      {
        header: "Type",
        accessorKey: "type",
      },
      {
        header: "Submitted Date",
        accessorKey: "date",
      },
      {
        header: "Author(s)",
        accessorKey: "authors",
        cell: ({ getValue }) => getValue().join(", "),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ getValue }) => {
          const status = getValue();
          const statusColorMap = {
            "Assigned": "bg-blue-100 text-blue-600",
            "Not Assigned": "bg-stone-100 text-stone-600",
            "Under Review": "bg-yellow-100 text-yellow-700",
            "Final Review Pending": "bg-orange-100 text-orange-700",
            "Rejected": "bg-red-100 text-red-600",
            "Revision Requested": "bg-purple-100 text-purple-600",
          };
          return (
            <span
              className={`ppr-submission-status-span ${statusColorMap[status]}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
          <button
            className="ppr-submission-action"
            onClick={() => {
              setSelectedRow(row.original);
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
    <div className="ppr-submission-table-container">
      <h3 className="ppr-submission-table-title">
        <MdOutlineDocumentScanner /> Paper Submissionssss
      </h3>

      <table className="ppr-submission-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="ppr-submission-table-headers"
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
      <div className="ppr-submission-btn-section">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="ppr-submission-prev-btn disabled:opacity-50"
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
          className="ppr-submission-next-btn disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <RowActionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        rowData={selectedRow}
        onAssign={(assignee) => {
          console.log(`Assigned to ${assignee}`, selectedRow);
          // Optional: Add backend call or state update here
        }}
      />
    </div>
  );
};

export default PaperSubmission;
