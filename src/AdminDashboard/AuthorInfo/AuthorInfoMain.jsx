import React from "react";
import "./AuthorInfoMain.css";
import TopBar from "../Dashboard/TopBar/TopBar";
import AuthorInfoTable from "./AuthorInfoTable/AuthorInfoTable";

const AuthorInfoMain = () => {
  return (
    <div className="admin-author-info-page shadow">
      <TopBar />
      <div className="px-5">
        <AuthorInfoTable />
      </div>
    </div>
  );
};

export default AuthorInfoMain;
