import React, { useEffect, useState } from "react";
import "./Subjects.css";
import NavBar from "../../NavBar/NavBar";

const Subjects = () => {
  const [subjects, setSubjects] = useState({ Engineering: [], Management: [] });
  const [activeTab, setActiveTab] = useState("Engineering");

  useEffect(() => {
    fetch("/Jsonfolder/Subjects.json")
      .then((res) => res.json())
      .then((data) => {
        const eng = data.Engineering.slice(0, 10); // 5 from engineering
        const mgmt = data.Management.slice(0, 10); // 4 from management
        setSubjects({ Engineering: eng, Management: mgmt });
      });
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
    <NavBar />
    <div className="u-container subjects-wrapper">
      <h2 className="subjects-title">Subjects </h2>

      <div className="tab-section">
        <span
          className={`tab ${activeTab === "Engineering" ? "active" : ""}`}
          onClick={() => handleTabClick("Engineering")}
        >
          Engineering
        </span>
        <span
          className={`tab ${activeTab === "Management" ? "active" : ""}`}
          onClick={() => handleTabClick("Management")}
        >
          Management
        </span>
      </div>

      <div className="subjects-grid">
        {subjects[activeTab].map((field, index) => (
          <div key={index} className="subject-card">
            {field}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Subjects;
