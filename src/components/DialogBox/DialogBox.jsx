import React from "react";
import "./DialogBox.css";

const DialogBox = ({ isOpen, onClose, rowData }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <button className="dialog-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="dialog-title">Paper Details</h2>
        <div className="dialog-content">
          {Object.entries(rowData).map(([key, value]) => (
            <div key={key} className="dialog-row">
              <span className="dialog-key">{key}:</span>
              <span className="dialog-value">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
