import React from "react";
import { Outlet } from "react-router-dom";
import AuthorSidebar from "./AuthorDashboardSection/AuthorSidebar/AuthorSidebar";
import NavBar from "../components/sections/NavBar/NavBar";
import "./AuthorDashboard.css";

const AuthorDashboard = () => {
  return (
    <>
      <NavBar />
      <div className="bg-stone-100">
        <main className="author-dashboard-main">
          <AuthorSidebar />
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AuthorDashboard;
