import React from "react";
import "./PaymentSuccessModal.css";

const PaymentSuccessModal = () => {
  const handleClose = () => {
    // Optional: Add any cleanup or state update logic here if needed
    // For now, it simply reloads or can be enhanced with routing logic
    window.location.reload(); // Or navigate elsewhere if using React Router
  };

  return (
    <div className="payment-modal-overlay" onClick={handleClose}>
      <div
        className="payment-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="payment-animation">
          <div className="checkmark-circle">
            <div className="background"></div>
            <div className="checkmark"></div>
          </div>
        </div>
        <h2 className="payment-title">Payment Successful!</h2>
        <p className="payment-message">
          Thank you for your payment. Your transaction has been completed.
        </p>
        <button className="payment-close-btn" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
