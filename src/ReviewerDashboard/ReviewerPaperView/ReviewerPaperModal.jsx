import React, { useState, useEffect } from "react";
import "./ReviewerPaperModal.css";

const ReviewerPaperModal = ({ onClose }) => {
  const [paper, setPaper] = useState(null);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    fetch("/Jsonfolder/paperReview.json")
      .then((res) => res.json())
      .then((data) => setPaper(data))
      .catch((err) => console.error("Error fetching paper:", err));
  }, []);

  const handleApprove = () => {
    alert("Paper Approved");
    // Send remarks & status to backend here
    onClose();
  };

  const handleReject = () => {
    alert("Paper Rejected");
    // Send remarks & status to backend here
    onClose();
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = paper.pdfUrl;
    link.download = "paper.pdf";
    link.click();
  };

  if (!paper) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}></button>

        <h2>{paper.title}</h2>

        <div className="pdf-container">
          <iframe src={paper.pdfUrl} title="PDF Viewer" frameBorder="0" />
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

export default ReviewerPaperModal;
