import React from "react";
import { Outlet } from "react-router-dom";
import ReviewerSideBar from "./ReviewerSideBar/ReviewerSideBar";
import NavBar from "../components/sections/NavBar/NavBar";

const ReviewerDashboard = () => {
  return (
    <>
      <NavBar />
      <div className="bg-stone-100">
        <main className="grid gap-4 p-4 grid-cols-[220px_1fr]">
          <ReviewerSideBar />
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default ReviewerDashboard;
