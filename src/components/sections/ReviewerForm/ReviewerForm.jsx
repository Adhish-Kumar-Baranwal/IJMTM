import React, { useState } from "react";
import NavBar from "../../NavBar/NavBar";
import { useForm } from "react-hook-form";
import "./ReviewerForm.css";
import { FiChevronLeft } from "react-icons/fi";

const ReviewerForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <NavBar />

      <div className="reviewer-form-container">
        <div className="reviewer-title-section">
          <h2 className="reviewer-form-title">Become a Reviewer</h2>
          <p className="reviewer-form-text">
            Apply to join our team of expert reviewers
          </p>

          <div className="my-5 py-4 border-b-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ppr-sub-guidelines-btn"
            >
              <span>Reviewer Information</span>
              <FiChevronLeft
                className={`chevron-icon ${isOpen ? "rotate" : ""}`}
              />
            </button>

            <div
              className={`ppr-sub-guidelines-wrapper ${isOpen ? "open" : ""}`}
            >
              <div className="space-y-4 p-4 ppr-sub-guidelines">
                <p>
                  The Journal of Advanced Research is looking for qualified
                  reviewers to join our peer review team. Reviewers play a
                  crucial role in maintaining the quality and integrity of our
                  published research.
                </p>
                <p>
                  <strong>Requirements:</strong>
                </p>
                <ul>
                  <li>Ph.D. or equivalent in a relevant field</li>
                  <li>Publication record in peer-reviewed journals</li>
                  <li>Expertise in one or more of our subject areas</li>
                  <li>
                    Ability to provide thorough, constructive, and timely
                    reviews
                  </li>
                </ul>
                <p>
                  <strong>Benefits:</strong>
                </p>
                <ul>
                  <li>
                    Recognition as a reviewer in our annual acknowledgment
                  </li>
                  <li>Access to reviewer resources and training</li>
                  <li>Opportunity to contribute to your field</li>
                  <li>Certificate of recognition after completing reviews</li>
                </ul>
              </div>
            </div>
          </div>
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

          {/* <div className="reviewer-password-section">
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
          </div> */}

          <div className="reviewer-register-center-button">
            <button type="submit" className="reviewer-register-btn">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReviewerForm;
