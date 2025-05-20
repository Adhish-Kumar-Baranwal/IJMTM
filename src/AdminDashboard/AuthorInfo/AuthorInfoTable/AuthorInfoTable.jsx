import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {  FiUsers } from "react-icons/fi";
import "./AuthorInfoTable.css"

const AuthorInfoTable = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    axios.get("https://t4hxj7p8-5000.inc1.devtunnels.ms/api/auth/authors")
      .then((res) => {
        // Map response to include submissions and publications as "Null"
        const formatted = res.data.map((author) => ({
          ...author,
          submissions: "Null",
          publications: "Null",
        }));
        setData(formatted);
      })
      .catch((err) => console.error("Error fetching authors:", err));
  }, []);

  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "fullName",
        cell: ({ row }) => {
          const { name } = row.original;
          return name || "N/A";
        },
      },
      {
        header: "Submissions",
        accessorKey: "submissions",
        cell: () => "Null",
      },
      {
        header: "Publications",
        accessorKey: "publications",
        cell: () => "Null",
      },
      {
        header: "Designation",
        accessorKey: "designation",
        cell: ({ row }) => row.original.designation || "N/A",
      },
      {
        id: "actions",
        header: "Actions",
        cell: () => (
          <Link
            to="/profile" 
            className="text-blue-600 hover:underline text-sm"
          >
            Visit Profile 👤
          </Link>
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
    <div className="atuhor-info-table-contianer">
      <div className="atuhor-info-table-title">
        <h3 className="info-table-title">
          <FiUsers /> Authors
        </h3>
      </div>

      <table className="author-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="author-table-header"
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
      <div className="author-table-btn-section">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="author-table-prev-btn"
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
          className="author-table-next-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AuthorInfoTable;
