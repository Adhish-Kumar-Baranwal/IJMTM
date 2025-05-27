//AdminModal.jsx
import React, { useState } from "react";
import "../../ReviewerDashboard/ReviewerPaperView/ReviewerPaperModal.css";
const AdminModal = ({ onClose, paper }) => {
  const [remarks, setRemarks] = useState("");

  if (!paper || !paper.pdfUrl) return null;

  const { pdfUrl, title } = paper;

  const handleApprove = () => {
    alert("Paper Approved");
    // You can send `remarks` and `status` to the backend here
    onClose();
  };

  const handleReject = () => {
    alert("Paper Rejected");
    // You can send `remarks` and `status` to the backend here
    onClose();
  };

  const handleDownload = async () => {
  try {
    const response = await fetch(pdfUrl, { mode: "cors" }); // ensure CORS is allowed
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
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>

        <h2 className="modal-title">{title || "Paper Title"}</h2>

        <div className="pdf-container">
          <iframe
            src={pdfUrl}
            title="PDF Viewer"
            frameBorder="0"
            width="100%"
            height="500px"
          />
        </div>

        <textarea
          className="remarks-input"
          placeholder="Write your remarks here..."
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />

        <div className="modal-buttons">
          <button className="btn approve" onClick={handleApprove}>Approve</button>
          <button className="btn reject" onClick={handleReject}>Reject</button>
          <button className="btn download" onClick={handleDownload}>Download PDF</button>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
