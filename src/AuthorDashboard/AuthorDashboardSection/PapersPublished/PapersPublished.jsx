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
import papersPublished from "../../../../public/Jsonfolder/AuthorsPublishedPapers.json"
import "./PapersPublished.css"

const PapersPublished = () => {
  // const [data, setData] = useState([]);
  const data  = useMemo(() => papersPublished, []);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

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


  
/* 
    {
      "title": "Exploring AI in Healthcare",
      "type": "Research Paper",
      "authors": ["Dr. Aayushi Mehta", "Karan Dev"],
      "publishedDate": "2025-03-22"
    },
*/
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
        header: "Published Date",
        accessorKey: "publishedDate",
        // cell: ({ row }) => row.original.datePublished,
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
    data: papersPublished,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="ppr-published-container">
      <h3 className="ppr-published-table-title">
        <MdLibraryBooks /> Papers Published
      </h3>

      <table className="ppr-published-table">
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

      <div className="ppr-published-table-btn-sec">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="ppr-published-prev-btn disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="ppr-published-next-btn disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PapersPublished;
