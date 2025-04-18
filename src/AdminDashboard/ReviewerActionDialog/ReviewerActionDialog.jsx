import React, { useEffect, useState } from "react";
import "./ReviewerActionDialog.css"; // Reuse the same CSS

const ReviewerActionDialog = ({ isOpen, onClose, reviewerId, onDecision }) => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (reviewerId && isOpen) {
      const fetchFormData = async () => {
        try {
          const response = await fetch(
            `https://your-backend-api.com/api/reviewer-form/${reviewerId}`
          );
          const data = await response.json();
          setFormData(data);
        } catch (error) {
          console.error("Failed to fetch form data", error);
        } finally {
          setLoading(false);
        }
      };

      fetchFormData();
    }
  }, [reviewerId, isOpen]);

  if (!isOpen) return null;

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
          {loading ? (
            <p>Loading...</p>
          ) : formData ? (
            <>
              <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Degree:</strong> {formData.degree}</p>
              <p><strong>Applied Date:</strong> {formData.appliedDate}</p>
              <p><strong>Designation:</strong> {formData.designation}</p>
              <p><strong>Experience:</strong> {formData.experience}</p>
              <p><strong>Motivation:</strong> {formData.motivation}</p>
              {/* Add more fields as per your backend response */}
            </>
          ) : (
            <p>Unable to load data.</p>
          )}
        </div>

        <div className="dialog-footer">
          <button
            className="action-button"
            onClick={() => onDecision("approved", formData)}
          >
            Approve
          </button>
          <button
            className="action-button reject"
            onClick={() => onDecision("rejected", formData)}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewerActionDialog;
