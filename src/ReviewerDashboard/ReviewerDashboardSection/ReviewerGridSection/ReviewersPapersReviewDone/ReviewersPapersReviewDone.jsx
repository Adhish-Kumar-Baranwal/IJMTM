// ReviewersPapersReviewDone.jsx
import React, { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { MdDocumentScanner } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import ReviewerPaperModal from "../../../ReviewerPaperView/ReviewerPaperModal";

const ReviewersPapersReviewDone = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [papers, setPapers] = useState(null);
  const [error, setError] = useState(null);

  const [selectedPaper, setSelectedPaper] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (paper) => {
    setSelectedPaper(paper);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setSelectedPaper(null);
    setIsModalOpen(false);
  };

  // convert fetched array into table data
  const data = useMemo(() => {
    if (!papers) return [];
    return Array.isArray(papers) ? papers : [papers];
  }, [papers]);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const reviewerId = user?.reviewer;
        if (!reviewerId) throw new Error("Reviewer ID not in localStorage");

        const res = await fetch(
          `https://t4hxj7p8-5000.inc1.devtunnels.ms/api/research-paper/submission/reviewer/${reviewerId}`
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const json = await res.json();

        // filter only those whose status is "Accepted" (i.e. review done)
        const donePapers = (json.submissions || []).filter(
          (p) => p.status === "Accepted"
        );
        setPapers(donePapers);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPapers();
  }, []);

  const columns = useMemo(
    () => [
      { header: "Title", accessorKey: "title" },
      { header: "Domain", accessorKey: "domain" },
      { header: "Type", accessorKey: "documentType" },
      {
        header: "Submitted",
        accessorKey: "submissionDate",
        cell: ({ getValue }) =>
          new Date(getValue()).toLocaleDateString("en-GB"),
      },
      {
        header: "Deadline",
        accessorKey: "reviewDeadline",
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
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <button
            className="hover:bg-stone-200 rounded p-1 text-sm"
            onClick={() => handleOpenModal(row.original)}
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
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300 mt-5">
      {error && <div className="text-red-500 mb-2">Error: {error}</div>}
      {!papers && !error && <div className="mb-2">Loading…</div>}

      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <MdDocumentScanner /> Reviewed Papers
        </h3>
        <button className="text-sm hover:underline">See all</button>
      </div>

      {papers && papers.length === 0 ? (
        <div className="text-center text-stone-500">
          No reviewed papers found.
        </div>
      ) : (
        <>
          <table className="w-full table-auto border border-stone-300 border-collapse">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr
                  key={hg.id}
                  className="text-sm font-normal text-stone-500"
                >
                  {hg.headers.map((header) => (
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
              {table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={i % 2 ? "bg-stone-300 text-sm" : "text-sm"}
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
        </>
      )}

      {isModalOpen && (
        <ReviewerPaperModal
          paper={selectedPaper}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ReviewersPapersReviewDone;
