import React from "react";
import "./Journal_Information.css";

const Journal_Information = () => {
  return (
    <>

      <div className="info-container">
        <h2 className="info-header">Journal Information</h2>

        <div className="info-sub-container">
          <h3 className="info-header-2">Aim & Scope</h3>
          <p className="info-para">
            <strong>Aim: </strong>
            The journal aims to foster global knowledge dissemination by
            publishing high-quality research in advanced technology and
            management. It seeks to promote academic and professional dialogue
            that drives innovation and addresses real-world challenges through
            impactful research. <br />
            <strong>Scope: </strong>
            The journal covers interdisciplinary domains that bridge technology
            and management, with a strong emphasis on innovation and practical
            application. Key areas of focus include emerging technologies,
            sustainable management practices, artificial intelligence, and
            industrial advancements.
          </p>
        </div>

        <div className="info-sub-container">
          <h3 className="info-header-2">
            <em>IJMTM</em>'s Mission
          </h3>
          <p className="info-para">
            The mission of the journal is to advance and disseminate global
            knowledge by serving as a platform for high-quality,
            interdisciplinary research in advanced technology and management.
            Through the promotion of innovative ideas and practical solutions,
            the journal strives to bridge the gap between academic research and
            real-world applications, contributing to sustainable development and
            technological progress.
          </p>
        </div>

        <div className="info-sub-container">
          <h3 className="info-header-2">About the Reviewers</h3>
          <p className="info-para">
            Our reviewers are distinguished domain experts dedicated to
            maintaining the highest standards of academic rigor. Selected for
            their deep subject knowledge and scholarly contributions, they
            carefully evaluate each submission for originality, relevance,
            clarity, and methodological soundness. In addition to ensuring
            technical accuracy, our reviewers provide constructive, insightful
            feedback to help authors refine and strengthen their work. Their
            commitment supports a fair, thorough, and enriching peer review
            process that upholds the quality and integrity of our publications.
          </p>
        </div>
      </div>
    </>
  );
};

export default Journal_Information;
