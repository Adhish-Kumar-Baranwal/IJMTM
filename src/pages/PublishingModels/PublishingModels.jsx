import React, { useEffect, useState } from "react";
import "./PublishingModels.css";
import NavBar from "../../components/sections/NavBar/NavBar";

const PublishingModels = () => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetch("/Jsonfolder/PublishingModels.json")
      .then((res) => res.json())
      .then((data) => setModels(data))
      .catch((err) => console.error("Error loading publishing models:", err));
  }, []);

  return (
    <>
      <NavBar />

      <div className="publishing-models-container">
        <h2 className="publishing-title">Publishing Models</h2>
        <p className="publishing-subtext">
          Our journal offers a variety of scholarly publication models tailored
          to diverse research outputs.
        </p>
        <div className="models-grid">
          {models.map((model, index) => (
            <div key={index} className="model-card">
              <h3 className="model-type">{model.type}</h3>
              <p className="model-description">{model.description}</p>
              <a
                href={model.templateLink}
                className="download-template-btn"
                download
              >
                Download Template
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PublishingModels;
