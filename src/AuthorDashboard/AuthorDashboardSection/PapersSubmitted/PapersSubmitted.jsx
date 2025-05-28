import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { MdOutlineUploadFile } from "react-icons/md";
import { Link } from "react-router-dom";
import "./PapersSubmitted.css";

const PapersSubmitted = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Fetch submission data
  useEffect(() => {
    axios
      .get("https://t4hxj7p8-5000.inc1.devtunnels.ms/api/research-paper/submission/author/6837208e549d0fc5a8d8a68c")
      .then((res) => {
        const formatted = res.data.submissions.map((submission) => ({
          title: submission.title,
          authors: submission.authors.map((a) => a.name),
          type: submission.documentType,
          submittedDate: new Date(submission.submissionDate).toLocaleDateString(),
        }));
        setData(formatted);
      })
      .catch((err) => console.error("Error fetching submissions:", err));
  }, []);

  const columns = useMemo(
    () => [
      {
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Author/Co-author",
        accessorKey: "authors",
        cell: ({ getValue }) => getValue().join(", "),
      },
      {
        header: "Type",
        accessorKey: "type",
      },
      {
        header: "Submitted Date",
        accessorKey: "submittedDate",
      },
       {
        header: "Status",
        accessorKey: "status",
        cell: ({ getValue }) => {
          const status = getValue();
          const statusColorMap = {
            Assigned: "bg-blue-100 text-blue-600",
            Approved: "bg-green-100 text-green-600",
            Rejected: "bg-red-100 text-red-600",
            Published: "bg-purple-100 text-purple-600",
            Submitted: "bg-yellow-100 text-yellow-600",
          };
          return (
            <span
              className={`ppr-submission-status-span ${statusColorMap[status] ?? ""
                }`}
            >
              {status}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: () => (
          <Link to="/profile" className="text-blue-600 hover:underline text-sm">
            View
          </Link>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="ppr-submitted-container">
      <h3 className="ppr-submitted-title">
        <MdOutlineUploadFile /> Papers Submitted
      </h3>

      <table className="ppr-submitted-table">
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
            <tr key={row.id} className={(index + 1) % 2 ? "bg-stone-300 text-sm" : "text-sm"}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-1.5 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="ppr-submitted-table-btn-section">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="ppr-submitted-prev-btn disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="ppr-submitted-next-btn disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PapersSubmitted;
