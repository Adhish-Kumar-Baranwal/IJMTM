import  { useEffect, useState } from "react";
import "./RowActionDialog.css";

const RowActionDialog = ({ isOpen, onClose, rowData, onAssign }) => {
  const [reviewers, setReviewers] = useState([]);
  const [selectedReviewers, setSelectedReviewers] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetch("https://t4hxj7p8-5000.inc1.devtunnels.ms/api/reviewers-approved")
  .then((res) => res.json())
  .then((data) => {
    console.log("Fetched reviewers:", data); // <- Add this
    setReviewers(data);
  })
  .catch((err) => console.error("Error fetching reviewers:", err));

    }
  }, [isOpen]);

  const handleReviewerChange = (e) => {
    const options = Array.from(e.target.selectedOptions);
    const values = options.map((option) => option.value);
    setSelectedReviewers(values);
    onAssign(values); // Pass array of selected reviewer IDs/names
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <div className="dialog-header">
          <h2>Submission Details</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>
        <div className="dialog-body">
          <p><strong>Title:</strong> {rowData?.title}</p>
          <p><strong>Type:</strong> {rowData?.documentType}</p>
          <p><strong>Submission Date:</strong> {new Date(rowData?.submissionDate).toLocaleDateString("en-GB")}</p>
          <p><strong>Author(s):</strong> {rowData?.authors?.map(a => a.name).join(", ")}</p>

          <label className="assign-label">
            Assign to:
           <select
  className="assign-select"
  multiple
  value={selectedReviewers}
  onChange={(e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedReviewers(selectedOptions);
    onAssign(selectedOptions); // pass selected list
  }}
>
              {reviewers.map((rev) => (
                <option key={rev._id} value={rev._id}>
                  {rev.firstName} {rev.lastName}
                </option>
              ))}
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
