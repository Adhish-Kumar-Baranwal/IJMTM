import React, { useState } from "react";
import NavBar from "../../NavBar/NavBar";
import "./PublishedPapers.css";
import Select from "react-select";


const PublishedPapers = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selected) => {
    console.log("Selected options:", selected);
    setSelectedOptions(selected);
  };

  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
  ];
  return (
    <>
      <NavBar />

      <div className="u-container">
        <h2 className="cfp-title">Call For Papers</h2>
      </div>

      <div className="u-container">
        <div className="filter-container">
          <div className="cfp-search-section">
            <label>Search for research articles</label>
            <input type="text" name="" id="" className="cfp-search-box" placeholder="Search..." />
          </div>
          <div className="cfp-select-section">
            <label>Select Frameworks:</label>
              <Select
                isMulti
                options={options}
                value={selectedOptions}
                onChange={handleSelectChange} 
              />
          </div>
          <div className="cfp-select-section">
            <label>Select Frameworks:</label>
              <Select
                isMulti
                options={options}
                value={selectedOptions}
                onChange={handleSelectChange} 
              />
          </div>
        </div>
      </div>

      <div className="bg-gray-700 h-70 u-container">
      </div>

    </>
  );
};

export default PublishedPapers;
