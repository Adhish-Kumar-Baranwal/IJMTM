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

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://t4hxj7p8-5000.inc1.devtunnels.ms/api/reviewer/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        alert("Your application has been submitted successfully!");
        reset();
      } else {
        alert("Application submission failed.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Try again later.");
    }
  };
  
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

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="reviewer-name-section">
            <div>
              <label>First Name*: </label>
              <input
                className="reviewer-name-input"
                type="text"
                {...register("firstName", { required: true })}
              />
            </div>
            <div>
              <label>Last Name*: </label>
              <input
                className="reviewer-name-input"
                type="text"
                {...register("lastName", { required: true })}
              />
            </div>
          </div>

          <div className="reviewer-contact-section">
            <div>
              <label>Email ID*: </label>
              <input
                className="reviewer-name-input"
                type="email"
                {...register("email", { required: true })}
              />
            </div>

            <div>
              <label>Contact No.*: </label>
              <input
                className="reviewer-name-input"
                type="text"
                {...register("contact", { required: true })}
              />
            </div>
          </div>

          <div className="reviewer-name-section">
            <div>
              <label>Designation*: </label>
              <input
                className="reviewer-name-input"
                type="text"
                {...register("designation", { required: true })}
              />
            </div>
            <div>
              <label>Degree/Education*: </label>
              <input
                className="reviewer-name-input"
                type="text"
                {...register("degree", { required: true })}
              />
            </div>
            <div>
              <label>Experience*: </label>
              <select
                className="reviewer-name-input"
                {...register("experience", { required: true })}
              >
                <option value="" disabled hidden>Select experience</option>
                <option value="0-1yr">0-1yr</option>
                <option value="1-2yrs">1-2yrs</option>
                <option value="3+yrs">3+yrs</option>
              </select>
            </div>

            <div>
              <label>Domain*: </label>
              <select
                className="reviewer-name-input"
                {...register("domain", { required: true })}
              >
                <option value="" disabled hidden>Select domain</option>
                <option value="Generative AI">Generative AI</option>
                <option value="Natural Language Processing Using Machine Learning">
                  Natural Language Processing Using Machine Learning
                </option>
                <option value="Generative Artificial Intelligence (GenAI), Machine Learning, & Web Development">
                  Generative Artificial Intelligence (GenAI), Machine Learning,
                  & Web Development
                </option>
                <option value="Deep learning & Geospatial">
                  Deep learning & Geospatial
                </option>
                <option value="Deep Learning and Machine learning">
                  Deep Learning and Machine learning
                </option>
                <option value="Web Development & NLP">
                  Web Development & NLP
                </option>
                <option value="Natural Language Processing & Machine Learning">
                  Natural Language Processing & Machine Learning
                </option>
                <option value="Blockchain + Web Development">
                  Blockchain + Web Development
                </option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Networking">Networking</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="IOT & AIML">IOT & AIML</option>
                <option value="Data Analytics">Data Analytics</option>
                
              </select>
            </div>

            <div>
              <label>Institute*: </label>
              <input
                className="reviewer-name-input"
                type="text"
                {...register("institute", { required: true })}
              />
            </div>
          </div>

          <div className="reviewer-textarea-section">
            <div>
              <label>Why should you join as a reviewer*: </label>
              <textarea
                className="reviewer-textarea-input"
                {...register("whyBeReviewer", { required: true })}
              />
            </div>
          </div>

          <div className="reviewer-password-section">
            <div>
              <label>Password*: </label>
              <input
                className="reviewer-password-input"
                type="password"
                {...register("password", { required: true })}
              />
            </div>
            <div>
              <label>Confirm Password*: </label>
              <input
                className="reviewer-password-input"
                type="password"
                {...register("password", { required: true })}
              />
            </div>
          </div>

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
