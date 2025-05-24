import React from "react";
import "./ReviewerActionDialog.css";
import axios from "axios";

const ReviewerActionDialog = ({
  isOpen,
  onClose,
  reviewerData,
  onDecision,
}) => {
  if (!isOpen || !reviewerData) return null;

  const {
    firstName,
    lastName,
    email,
    contact,
    degree,
    designation,
    experience,
    domain,
    institute,
    whyBeReviewer,
    appliedDate,
  } = reviewerData;

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <div className="dialog-header">
          <h2>Reviewer Application</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="dialog-body">
          <p>
            <strong>Name:</strong> {firstName} {lastName}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Contact:</strong> {contact}
          </p>
          <p>
            <strong>Degree:</strong> {degree}
          </p>
          <p>
            <strong>Designation:</strong> {designation}
          </p>
          <p>
            <strong>Experience:</strong> {experience}
          </p>
          <p>
            <strong>Domain:</strong> {domain}
          </p>
          <p>
            <strong>Institute:</strong> {institute}
          </p>
          <p>
            <strong>Why be Reviewer:</strong> {whyBeReviewer}
          </p>
          <p>
            <strong>Applied Date:</strong>{" "}
            {appliedDate ? new Date(appliedDate).toLocaleDateString() : "N/A"}
          </p>
        </div>

        <div className="dialog-footer">
          <button
            className="action-button"
            onClick={async () => {
              try {
                
                await axios.patch(
                  `https://t4hxj7p8-5000.inc1.devtunnels.ms/api/approve/${reviewerData._id}`
                );

                onDecision("approved", reviewerData); 
              } catch (error) {
                console.error("Failed to approve reviewer", error);
              }
            }}
          >
            Approve
          </button>
          <button
  className="action-button reject"
  onClick={async () => {
    try {
      await axios.patch(
        `https://t4hxj7p8-5000.inc1.devtunnels.ms/api/reject/${reviewerData._id}`
      );
      onDecision("rejected", reviewerData);
    } catch (error) {
      console.error("Failed to reject reviewer", error);
    }
  }}
>
  Reject
</button>

        </div>
      </div>
    </div>
  );
};

export default ReviewerActionDialog;
