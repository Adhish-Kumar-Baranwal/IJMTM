// RecentSubmission.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdOutlineDocumentScanner } from "react-icons/md";
import RowActionDialog from "../../../components/RowActionDialog/RowActionDialog";
import AdminModal from "../../../AuthorDashboard/ModalDialog/AdminModal";
import { Link } from "react-router-dom";

const RecentSubmission = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false); // New state
  const [reviewPaperData, setReviewPaperData] = useState(null); // New state

  useEffect(() => {
    const fetchRecentSubmissions = async () => {
      try {
        const response = await fetch(
          "https://t4hxj7p8-5000.inc1.devtunnels.ms/api/recent-submissions"
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching submissions:", err);
      }
    };

    fetchRecentSubmissions();
  }, []);

  const columns = useMemo(
    () => [
      {
        header: "Title",
        accessorKey: "title",
        cell: ({ row }) => (
          <span className="font-semibold flex items-center gap-1">
            {row.original.title}
          </span>
        ),
      },
      {
        header: "Type",
        accessorKey: "documentType",
      },
      {
        header: "Domain",
        accessorKey: "domain",
      },
      {
        header: "Submission Date",
        accessorKey: "submissionDate",
        cell: ({ getValue }) => {
          const rawDate = getValue();
          if (!rawDate) return "N/A";
          const date = new Date(rawDate);
          return isNaN(date.getTime())
            ? "Invalid Date"
            : date.toLocaleDateString("en-GB");
        },
      },
      {
        header: "Author(s)",
        accessorKey: "authors",
        cell: ({ getValue }) => {
          const authors = getValue();
          if (Array.isArray(authors)) {
            return authors.map((a) => a.name).join(", ");
          }
          return "-";
        },
      },
      {
        id: "viewPdf",
        header: "PDF",
        cell: ({ row }) => {
          const fileId = row.original?.pdfFileId;
          const title = row.original?.title;

          return fileId ? (
            <button
              onClick={() => {
                setReviewPaperData({
                  pdfUrl: `https://t4hxj7p8-5000.inc1.devtunnels.ms/api/papers/${fileId}`,
                  title: title,
                  _id: row.original._id,
                });
                setIsReviewModalOpen(true);
              }}
              className="text-blue-600 hover:underline text-sm"
            >
              View PDF
            </button>
          ) : (
            <span className="text-stone-400 italic text-sm">No file</span>
          );
        },
      },
      {
        id: "as",
        header: "Action",
        cell: ({ row }) => (
          <button
            className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8"
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
    <div className="col-span-12 p-4 rounded border border-stone-300 mt-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <MdOutlineDocumentScanner /> Recent Submissions
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

      {/* Row Actions Dialog */}
      <RowActionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        rowData={selectedRow}
        onAssign={(assignee) => {
          console.log(`Assigned to ${assignee}`, selectedRow);
        }}
      />

      {/* Reviewer Paper Modal */}
      {isReviewModalOpen && reviewPaperData && (
        <AdminModal
          onClose={() => setIsReviewModalOpen(false)}
          paper={reviewPaperData}
        />
      )}
    </div>
  );
};

export default RecentSubmission;
