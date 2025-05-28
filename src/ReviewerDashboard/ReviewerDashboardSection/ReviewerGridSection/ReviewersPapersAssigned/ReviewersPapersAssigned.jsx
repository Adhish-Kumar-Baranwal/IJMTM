//ReviewersPapersAssigned.jsx
import React, { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import ReviewerPaperModal from "../../../ReviewerPaperView/ReviewerPaperModal";


const ReviewersPapersAssigned = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [paper, setPaper] = useState(null);
  const [error, setError] = useState(null);

  const [selectedPaper, setSelectedPaper] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

const handleOpenModal = (paper) => {

  // Construct the pdfUrl similar to how it's done in RecentSubmission.jsx
  const paperWithUrl = {
    ...paper,
    pdfUrl: `https://t4hxj7p8-5000.inc1.devtunnels.ms/api/papers/${paper.pdfFileId}`,
  };
  setSelectedPaper(paperWithUrl);
  setIsModalOpen(true);
};

 const handleCloseModal = () => {
  setSelectedPaper(null);
  setIsModalOpen(false);
};



  
const data = useMemo(() => {
  return paper || [];
}, [paper]);

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.reviewer;
        if (!userId) throw new Error("User ID not found in localStorage");

        const res = await fetch(
          `https://t4hxj7p8-5000.inc1.devtunnels.ms/api/research-paper/submission/${userId}`
        );
        if (!res.ok) throw new Error("Failed to fetch research paper");
        const json = await res.json();
        
        setPaper(json.submissions);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPaper();
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
        header: "Status",
        accessorKey: "status",
        cell: ({ getValue }) => {
          const status = getValue();
          const map = {
            Assigned: "bg-blue-100 text-blue-600",
            "Under Review": "bg-yellow-100 text-yellow-700",
            "Revision Requested": "bg-purple-100 text-purple-600",
          };
          return (
            <span className={`px-2 py-0.5 rounded-full text-xs ${map[status]}`}>
              {status}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          console.log("row data:", row.original);
          return(
            
          <button
            className="hover:bg-stone-200 rounded p-1 text-sm"
            onClick={() => handleOpenModal(row.original)}
          >
            <FiMoreHorizontal />
          </button>
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
    <div className="col-span-12 p-4 rounded border border-stone-300 mt-5">
      {error && <div className="text-red-500 mb-2">Error: {error}</div>}
      {!paper && !error && <div className="mb-2">Loading…</div>}

      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <MdOutlineDocumentScanner /> Assigned Papers
        </h3>
        <button className="text-sm hover:underline">See all</button>
      </div>

      <table className="w-full table-auto border border-stone-300 border-collapse">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id} className="text-sm font-normal text-stone-500">
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
              className={(i + 1) % 2 ? "bg-stone-300 text-sm" : "text-sm"}
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
      {isModalOpen && selectedPaper && selectedPaper.pdfUrl && (
  <ReviewerPaperModal paper={selectedPaper} onClose={handleCloseModal} />
)}
    </div>
  );
};

export default ReviewersPapersAssigned;
