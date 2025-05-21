import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "./PublishedPapers.css";

const PublishedPapers = () => {
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/Jsonfolder/Paper.json")
      .then((res) => res.json())
      .then((data) => {
        setPapers(data);
        setFilteredPapers(data);
      })
      .catch((err) => console.error("Error loading papers:", err));
  }, []);

  // Extract unique years and subjects
  const yearOptions = [
    ...new Set(papers.map((paper) => paper.datePublished.split("-")[0])),
  ].map((year) => ({ value: year, label: year }));

  const subjectOptions = [
    ...new Set(papers.map((paper) => paper.domain)),
  ].map((subject) => ({ value: subject, label: subject }));

  // Filter logic
  useEffect(() => {
    let filtered = [...papers];

    if (searchTerm) {
      filtered = filtered.filter((paper) =>
        paper.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedYears.length > 0) {
      const selectedYearValues = selectedYears.map((opt) => opt.value);
      filtered = filtered.filter((paper) =>
        selectedYearValues.includes(paper.datePublished.split("-")[0])
      );
    }

    if (selectedSubjects.length > 0) {
      const selectedSubjectValues = selectedSubjects.map((opt) => opt.value);
      filtered = filtered.filter((paper) =>
        selectedSubjectValues.includes(paper.domain)
      );
    }

    setFilteredPapers(filtered);
  }, [searchTerm, selectedSubjects, selectedYears, papers]);

  return (
    <>
      <div className="u-container">
        <h2 className="cfp-title">Published Papers</h2>
      </div>

      <div className="u-container">
        <div className="filter-container">
          <div className="cfp-search-section">
            <label>Search for research articles</label>
            <input
              type="text"
              className="cfp-search-box"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="cfp-select-section">
            <label>Select Year Published:</label>
            <Select
              isMulti
              options={yearOptions}
              value={selectedYears}
              onChange={setSelectedYears}
            />
          </div>

          <div className="cfp-select-section">
            <label>Select Subject:</label>
            <Select
              isMulti
              options={subjectOptions}
              value={selectedSubjects}
              onChange={setSelectedSubjects}
            />
          </div>
        </div>
      </div>

      <div className="u-container">
        {filteredPapers.length === 0 ? (
          <p>No matching papers found.</p>
        ) : (
          filteredPapers.map((paper) => (
            <div className="paper-section" key={paper.id}>
              <div className="side-card">
                <p>{paper.type}</p>
                <p>{paper.datePublished}</p>
              </div>

              <div
                className="main-card"
                onClick={() => navigate(`/paper/${paper.id}`)}
                style={{ cursor: "pointer" }}
              >
                <p><strong>{paper.title}</strong></p>
                <p>{paper.abstract.slice(0, 150)}...</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default PublishedPapers;
