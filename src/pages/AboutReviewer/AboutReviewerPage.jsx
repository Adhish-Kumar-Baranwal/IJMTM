import React from "react";
import "./AboutReviewerPage.css";
import { useNavigate } from "react-router-dom";

const AboutReviewerPage = () => {
  const navigate = useNavigate();

  return (
    <>

      <div className="about-reviewer-page-container">
        <h1 className="about-reviewer-title">Become a Reviewer</h1>

        <div className="about-reviewer-section">
          <h2>About the Reviewer</h2>
          <p>
            A reviewer plays a crucial role in maintaining the quality of
            academic publications. By evaluating research papers, reviewers
            ensure that only high-quality and original work is published.
          </p>
        </div>

        <div className="reviewer-duties-section">
          <h2>What Does a Reviewer Do?</h2>
          <ul>
            <li>
              Critically assess research papers for quality and originality.
            </li>
            <li>Provide constructive feedback to improve manuscripts.</li>
            <li>Ensure ethical research practices are followed.</li>
            <li>Contribute to the advancement of scientific knowledge.</li>
          </ul>
        </div>

        <div className="reviewer-benefits-section">
          <h2>Why Become a Reviewer?</h2>
          <ul>
            <li>Gain recognition in the academic community.</li>
            <li>
              Enhance your knowledge and stay updated with research trends.
            </li>
            <li>Expand your professional network.</li>
            <li>Receive certificates and acknowledgments for contributions.</li>
          </ul>
        </div>

        <div className="reviewer-eligibility-section">
          <h2>Eligibility Criteria</h2>
          <p>
            To become a reviewer, you should have a strong background in your
            field of research, with prior publications or expertise in peer
            reviewing.
          </p>
        </div>

        <div className="apply-reviewer-button-container">
          <button
            className="apply-reviewer-button"
            onClick={() => navigate("/apply-for-reviewer")}
          >
            Apply as a Reviewer
          </button>
        </div>
      </div>
    </>
  );
};

export default AboutReviewerPage;
