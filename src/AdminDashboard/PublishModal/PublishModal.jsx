import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import "../../ReviewerDashboard/ReviewerPaperView/ReviewerPaperModal.css";
import axios from "axios";

const PublishModal = ({ onClose, paper, reviewerId }) => {
  const [remarks, setRemarks] = useState("");
  const [reviewerRemarks, setReviewerRemarks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dragRef = useRef(null);
  
  console.log("😤",paper);
 

  if (!paper || !paper.pdfUrl) return null;

  const { pdfUrl, title } = paper;

   const handlePublish = async () => {
  try {
    const res = await fetch(
      "https://t4hxj7p8-5000.inc1.devtunnels.ms/api/research-paper/submission/6836c02f1e421d4fcbaf6d29",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Published",
          reviewComments: remarks,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to update status");
    }

    const data = await res.json();
    alert("Paper Approved");

    // Optional: Trigger a re-fetch or update UI accordingly
    onClose();
  } catch (error) {
    alert("Error approving paper: " + error.message);
  }
};

 const handleReject = async () => {
  try {
    const res = await fetch(
      "https://t4hxj7p8-5000.inc1.devtunnels.ms/api/research-paper/submission/6836c02f1e421d4fcbaf6d29", // Replace with dynamic ID if needed
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Rejected",
          reviewComments: remarks,
          
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to update status");
    }

    const data = await res.json();
    alert("Paper Rejected");
    onClose();
  } catch (error) {
    alert("Error rejecting paper: " + error.message);
  }
};

  const handleDownload = async () => {
    try {
      const response = await fetch(pdfUrl, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", `${title || "paper"}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download PDF.");
    }
  };

  return (
    <div className="modal-overlay">
      <Draggable handle=".modal-title" nodeRef={dragRef}>
        <div ref={dragRef}>
          <div className="modal-content">
            <button className="modal-close" onClick={onClose}>×</button>

            <div className="modal-body">
              <div className="left-section">
                <h2 className="modal-title">{title || "Paper Title"}</h2>
                <div className="pdf-container">
                  <iframe
                    src={pdfUrl}
                    title="PDF Viewer"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>

              <div className="right-section">
                <textarea
                  className="remarks-input"
                  placeholder="Write your remarks here..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
                
                {/* Remark Received section */}
                <div className="remark-received">
                  <h4>Remark Received:</h4>
                  {paper.reviewComments}
                </div>
                
                <div className="modal-buttons">
                  <button className="btn approve" onClick={handlePublish}>Publish</button>
                  <button className="btn reject" onClick={handleReject}>Reject</button>
                  <button className="btn download" onClick={handleDownload}>Download PDF</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default PublishModal;