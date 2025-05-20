import React, { useEffect, useState } from "react";
import "./JournalPolicies.css";
import NavBar from "../../components/sections/NavBar/NavBar";

const JournalPolicies = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    fetch("/Jsonfolder/JournalPolicies.json")
      .then((res) => res.json())
      .then((data) => setPolicies(data))
      .catch((err) => console.error("Failed to load policies:", err));
  }, []);

  return (
    <>
      <NavBar />

      <div className="u-container journal-policies-wrapper">
        <h2 className="journal-policies-title"> IJMTM Journal Policies</h2>
        <p className="journal-policies-intro">
          The Journal Policies are designed to ensure a transparent, ethical,
          and high-quality publishing process. These policies are aimed at
          maintaining the journal's standards for academic integrity, research
          quality, and professional conduct.
        </p>
        <div className="journal-policies-list">
          {policies.map((policy, idx) => (
            <div className="policy-card" key={idx}>
              <h3 className="policy-title">
                {idx + 1}. {policy.title}
              </h3>
              <ul className="policy-points">
                {policy.points.map((point, pIdx) => (
                  <li key={pIdx}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default JournalPolicies;
