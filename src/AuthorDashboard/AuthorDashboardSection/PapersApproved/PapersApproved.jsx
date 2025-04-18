import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { MdLibraryBooks } from "react-icons/md";
import { Link } from "react-router-dom";
import papersApproved from "../../../../public/Jsonfolder/AuthorPaperApproved.json";
import AuthorPaymentDialogBox from "../../AuthorPaymentDialogBox/AuthorPaymentDialogBox";

const PapersApproved = () => {
  // const [data, setData] = useState([]);
  const data = useMemo(() => papersApproved, []);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // useEffect(() => {
  //   axios.get("https://t4hxj7p8-5000.inc1.devtunnels.ms/api/auth/authors")
  //     .then((res) => {
  //       const formatted = res.data.map((author) => ({
  //         ...author,
  //         publicationTitle: "Sample Publication",
  //         datePublished: "N/A",
  //       }));
  //       setData(formatted);
  //     })
  //     .catch((err) => console.error("Error fetching authors:", err));
  // }, []);

  const columns = useMemo(
    () => [
      {
        header: "Title",
        accessorKey: "title",
        // cell: ({ row }) => row.original.name || "N/A",
      },
      {
        header: "Author/Co-author",
        accessorKey: "authors",
        cell: ({ getValue }) => getValue().join(", "),
      },
      {
        header: "Type",
        accessorKey: "type",
        // cell: ({ row }) => row.original.publicationTitle || "N/A",
      },
      {
        header: "Submitted Date",
        accessorKey: "submittedDate",
        // cell: ({ row }) => row.original.datePublished,
      },
      {
        header: "Approved Date",
        accessorKey: "approvedDate",
        // cell: ({ row }) => row.original.datePublished,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <button
            onClick={() => {
              setSelectedRowData(row.original);
              setIsDialogOpen(true);
            }}
            className="text-sm text-white cursor-pointer bg-green-600 hover:bg-green-700 rounded px-3 py-1"
          >
            Pay
          </button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: papersApproved,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300 my-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <MdLibraryBooks /> Papers Approved
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
      <AuthorPaymentDialogBox
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        rowData={selectedRowData}
        actionButton={
          <button
            onClick={() => {
              // Placeholder for redirecting to payment gateway
              // Replace with your backend redirect later
              // replace with window.location.href = `https://your-backend.com/pay?paperId=${selectedRowData.id}`;
              alert("Redirecting to payment gateway...");
              setIsDialogOpen(false);
            }}
          >
            Proceed to Payment
          </button>
        }
      />
    </div>
  );
};

export default PapersApproved;
