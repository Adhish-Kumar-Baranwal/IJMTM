import React from "react";
import "./AboutJournal.css";

const AboutJournal = () => {
  return (
    <div className="u-container about-journal-container">
      <div className="about-section">
        <h2 className="about-heading">About Our Journal</h2><hr/>
        <p className="about-description">
          The Journal of Advanced Research is a peer-reviewed, open access journal that publishes original research articles,
          review articles, and case studies across multiple disciplines.
        </p>

        <div className="about-subsection">
          <h3 className="subsection-heading">Aim</h3>
          <p>To publish high-quality research that advances knowledge and contributes to scientific progress.</p>
        </div>

        <div className="about-subsection">
          <h3 className="subsection-heading">Scope</h3>
          <p>
            Our journal covers a wide range of disciplines including but not limited to: Computer Science,
            Environmental Science, Medicine, Engineering, Social Sciences, and Humanities.
          </p>
        </div>

        <div className="about-subsection">
          <h3 className="subsection-heading">Mission</h3>
          <p>
            To promote the dissemination of research findings and facilitate academic discourse across disciplines.
          </p>
        </div>

        <button className="about-btn">Learn more about us</button>
      </div>

      <div className="info-section">
        <h2 className="info-heading">Key Information</h2> <hr />
        <div className="info-item">
          <p className="info-label">Impact Factor</p>
          <p className="info-value">3.8</p>
          <p className="info-subtext">5-Year Impact Factor: 4.2</p>
        </div>

        <div className="info-item">
          <p className="info-label">Review Time</p>
          <p className="info-value">6 weeks</p>
          <p className="info-subtext">Average time to first decision</p>
        </div>

        <div className="info-item">
          <p className="info-label">Acceptance Rate</p>
          <p className="info-value">32%</p>
          <p className="info-subtext">Based on 2022 submissions</p>
        </div>

        <div className="info-item">
          <p className="info-label">Publication Time</p>
          <p className="info-value">12 weeks</p>
          <p className="info-subtext">From submission to publication</p>
        </div>

        <button className="submit-btn">Submit Your Research</button>
      </div>
    </div>
  );
};

export default AboutJournal;
