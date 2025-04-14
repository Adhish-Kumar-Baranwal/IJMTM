import React from "react";
import NavBar from "../../NavBar/NavBar";
import { useForm } from "react-hook-form";
import "./ReviewerForm.css";

const ReviewerForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <>
      <NavBar />

      <div className="reviewer-form-container">
        <div className="reviewer-title-section">
          <h2 className="reviewer-form-title">Reviewer Registration</h2>
          <p className="reviewer-form-text">
            Already have and account?{" "}
            <span className="reviewer-form-link">Login</span>
          </p>
        </div>

        <form>
          <div className="reviewer-name-section">
            <div>
              <label>First Name*: </label>
              <input
                className="reviewer-name-input"
                type="text"
                {...register("first_name", { required: true, min: 3 })}
              />
            </div>
            <div>
              <label>Last Name*: </label>
              <input
                className="reviewer-name-input"
                type="text"
                {...register("last_name", { required: true, min: 3 })}
              />
            </div>
          </div>

          <div className="reviewer-contact-section">
            <div>
              <label>Email ID*: </label>
              <input
                className="reviewer-name-input"
                type="email"
                {...register("email_id", { required: true })}
              />
            </div>

            <div>
              <label>Contact No.*: </label>
              <input
                className="reviewer-name-input"
                type="text"
                {...register("contact_no", { required: true })}
              />
            </div>
          </div>

          <div className="reviewer-info-section">
            <div>
              <label>Designation*: </label>
              <input
                className="reviewer-name-input"
                type="text"
                {...register("designation", { required: true, min: 5 })}
              />
            </div>
            <div>
              <label>Institute*: </label>
              <input
                className="reviewer-name-input"
                type="text"
                {...register("institute", { required: true, min: 5 })}
              />
            </div>
          </div>

          <div className="reviewer-textarea-section">
            <div>
              <label>Published Papers*: </label>
              <textarea
                className="reviewer-textarea-input"
                {...register("published_papers", { required: true })}
              />
            </div>
            <div>
              <label>Why should you join as a reviewer*: </label>
              <textarea
                className="reviewer-textarea-input"
                {...register("why_be_reviewer", { required: true })}
              />
            </div>
          </div>

          <div className="reviewer-password-section">
            <div>
              <label>Password*: </label>
              <input
                className="reviewer-password-input"
                type="password"
                {...register("published_papers", { required: true })}
              />
            </div>
            <div>
              <label>Confirm Password*: </label>
              <input
                className="reviewer-password-input"
                type="password"
                {...register("published_papers", { required: true })}
              />
            </div>
          </div>

          <div className="reviewer-register-center-button">
          <button type="submit" className="reviewer-register-btn">
            Register
          </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReviewerForm;
