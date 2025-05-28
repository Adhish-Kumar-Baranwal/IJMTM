// PaperSubmission.jsx
import React, { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdOutlineDocumentScanner } from "react-icons/md";
import RowActionDialog from "../../../../components/RowActionDialog/RowActionDialog";
import "./PaperSubmission.css";
import PublishModal from "../../../PublishModal/PublishModal";

const PaperSubmission = () => {
  const [submissions, setSubmissions] = useState(null);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
const [isReviewModalOpen, setIsReviewModalOpen] = useState(false); // New state
  const [reviewPaperData, setReviewPaperData] = useState(null); // New state

  // fetch once on mount
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await fetch(
          "https://t4hxj7p8-5000.inc1.devtunnels.ms/api/research-paper/submission/admin"
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const json = await res.json();
        setSubmissions(json.submissions || []);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchSubmissions();
  }, []);

  // transform into array or empty while loading
  const data = useMemo(() => {
    if (!submissions) return [];
    return submissions;
  }, [submissions]);

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
        header: "Domain",
        accessorKey: "domain",
      },
      {
        header: "Type",
        accessorKey: "documentType",
      },
      {
        header: "Submitted Date",
        accessorKey: "submissionDate",
        cell: ({ getValue }) =>
          new Date(getValue()).toLocaleDateString("en-GB"),
      },
      {
        header: "Author(s)",
        accessorKey: "authors",
        cell: ({ getValue }) =>
          getValue().map((a) => a.name).join(", "),
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
        header: "Action",
        cell: ({ row }) => {
          const fileId = row.original?.pdfFileId;
          const title = row.original?.title;

          return fileId ? (
            <button
              onClick={() => {
                setReviewPaperData({
                  pdfUrl: `https://t4hxj7p8-5000.inc1.devtunnels.ms/api/papers/${fileId}`,
                  title: title,
                  reviewComments: row.original?.reviewComments || [],
                  _id: row.original?._id,
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
    <div className="ppr-submission-table-container">
      <h3 className="ppr-submission-table-title">
        <MdOutlineDocumentScanner /> Paper Submissions
      </h3>

      {error && (
        <div className="text-red-500 mb-2">Error: {error}</div>
      )}
      {!submissions && !error && (
        <div className="mb-2">Loading…</div>
      )}

      {submissions && submissions.length === 0 && (
        <div className="text-center text-stone-500">
          No submissions found.
        </div>
      )}

      {submissions && submissions.length > 0 && (
        <>
          <table className="ppr-submission-table">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="ppr-submission-table-headers">
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-start p-1.5"
                    >
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
              {table.getRowModel().rows.map((row, idx) => (
                <tr
                  key={row.id}
                  className={
                    (idx + 1) % 2
                      ? "bg-stone-300 text-sm"
                      : "text-sm"
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="p-1.5 whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

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
        </>
      )}

      <RowActionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        rowData={selectedRow}
        onAssign={(assignee) => {
          console.log(`Assigned to ${assignee}`, selectedRow);
          // TODO: call your backend to assign reviewer
        }}
      />

      {isReviewModalOpen && reviewPaperData && (
              <PublishModal
                onClose={() => setIsReviewModalOpen(false)}
                paper={reviewPaperData}
              />
            )}
    </div>
  );
};

export default PaperSubmission;
