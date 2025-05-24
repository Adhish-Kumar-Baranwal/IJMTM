
import React, { useEffect, useState } from "react";
import "./RowActionDialog.css";

const RowActionDialog = ({ isOpen, onClose, rowData, onAssign }) => {
  const [reviewers, setReviewers] = useState([]);
  const [selectedReviewers, setSelectedReviewers] = useState([]);
  const [reviewDeadline, setReviewDeadline] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetch("https://t4hxj7p8-5000.inc1.devtunnels.ms/api/reviewers-approved")
        .then((res) => res.json())
        .then((data) => setReviewers(data))
        .catch((err) => console.error("Error fetching reviewers:", err));

      
      setSelectedReviewers([]);
    }
  }, [isOpen, rowData]);

  const toggleReviewer = (id) => {
    setSelectedReviewers((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handleDone = async () => {
    const assignmentPayload = {
      paperId: rowData?._id,
      reviewers: selectedReviewers,
      deadline: reviewDeadline, 
    };

    try {
      const response = await fetch(
        "https://t4hxj7p8-5000.inc1.devtunnels.ms/api/research-paper/assign-reviewers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(assignmentPayload),
        }
      );

      if (response.ok) {
        console.log("✅ Assignment saved successfully");
        onAssign(assignmentPayload);
      } else {
        console.error("❌ Failed to save assignment:", await response.text());
      }
    } catch (error) {
      console.error("❌ Error during assignment POST:", error);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <div className="dialog-header">
          <h2>Submission Details</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="dialog-body">
          <p>
            <strong>Title:</strong> {rowData?.title}
          </p>
          <p>
            <strong>Type:</strong> {rowData?.documentType}
          </p>
          <p>
            <strong>Submission Date:</strong>{" "}
            {new Date(rowData?.submissionDate).toLocaleDateString("en-GB")}
          </p>
          <p>
            <strong>Author(s):</strong>{" "}
            {rowData?.authors?.map((a) => a.name).join(", ")}
          </p>

          <label className="assign-label">Assign to:</label>
          <div className="reviewer-list">
            {reviewers.map((rev) => {
              const isSelected = selectedReviewers.includes(rev._id);
              return (
                <div
                  key={rev._id}
                  className={`reviewer-item ${isSelected ? "selected" : ""}`}
                  onClick={() => toggleReviewer(rev._id)}
                >
                  <span>
                    {rev.firstName} {rev.lastName}
                  </span>
                  {isSelected && <span className="tick">✔</span>}
                </div>
              );
            })}
          </div>
          <label className="assign-label">Deadline for Review:</label>
          <input
            type="date"
            value={reviewDeadline}
            onChange={(e) => setReviewDeadline(e.target.value)}
            className="deadline-input"
          />
        </div>
        <div className="dialog-footer">
          <button className="action-button" onClick={handleDone}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default RowActionDialog;
