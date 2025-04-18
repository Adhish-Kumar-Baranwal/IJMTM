import React from "react";
import "./RowActionDialog.css";

const RowActionDialog = ({ isOpen, onClose, rowData, onAssign }) => {
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
          <p><strong>Title:</strong> {rowData?.title}</p>
          <p><strong>Type:</strong> {rowData?.documentType}</p>
          <p><strong>Submission Date:</strong> {new Date(rowData?.submissionDate).toLocaleDateString("en-GB")}</p>
          <p><strong>Author(s):</strong> {rowData?.authors?.map(a => a.name).join(", ")}</p>

          <label className="assign-label">
            Assign to:
            <select className="assign-select" onChange={(e) => onAssign(e.target.value)}>
              <option value="">Select Reviewer</option>
              <option value="reviewer1">Reviewer 1</option>
              <option value="reviewer2">Reviewer 2</option>
              <option value="reviewer3">Reviewer 3</option>
            </select>
          </label>
        </div>
        <div className="dialog-footer">
          <button className="action-button" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
};

export default RowActionDialog;
