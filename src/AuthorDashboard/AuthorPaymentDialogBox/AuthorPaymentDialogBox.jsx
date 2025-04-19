import React from "react";
import "./AuthorPaymentDialogBox.css";

const AuthorPaymentDialogBox = ({ isOpen, onClose, rowData, actionButton }) => {
  if (!isOpen || !rowData) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-box dialog-paper-details">
        <button className="dialog-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="dialog-title">Paper Details</h2>
        <div className="dialog-content">
          {Object.entries(rowData).map(([key, value]) => (
            <div key={key} className="dialog-row">
              <span className="dialog-key">{key}:</span>
              <span className="dialog-value">
                {Array.isArray(value) ? value.join(", ") : value}
              </span>
            </div>
          ))}
        </div>

        <div className="dialog-actions">
          {actionButton}
        </div>
      </div>
    </div>
  );
};

export default AuthorPaymentDialogBox;
