import React from "react";
import "./Papers.css";
import NavBar from "../NavBar/NavBar";

const Papers = () => {
  return (
    <>
      <NavBar />

      <div className="u-container">
        Title of Paper <br />
        Domain <br />
        Author names <br />
        Volume issue in which the paper is published <br />
        Date Published <br />
        DOI and Cite this article link <br />
        buttons: Download PDF, Share, Cite this article, Contact author <br />
        Abstract Box <br />
        keywords box
      </div>
    </>
  );
};

export default Papers;
