import React, { useEffect, useState } from "react";
import "./EditoralBoard.css";

const EditorialBoard = () => {
  const [editors, setEditors] = useState([]);

  useEffect(() => {
    fetch("/Jsonfolder/EditoralBoard.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => setEditors(data))
      .catch((err) => console.error("Error loading editorial board:", err));
  }, []);

  return (
    <div className="editorial-container">
      <h1 className="editorial-heading">About the Editors</h1>
      {editors.length === 0 ? (
        <p className="editorial-loading">Loading...</p>
      ) : (
        editors.map((editor, index) => (
          <div key={index} className="editor-card">
            <h2 className="editor-title">{editor.title}</h2>
            <p className="editor-name">{editor.name}</p>
            {editor.degree && <p className="editor-detail"><strong>Degree:</strong> {editor.degree}</p>}
            <p className="editor-detail"><strong>Designation:</strong> {editor.designation}</p>
            <p className="editor-detail"><strong>Department:</strong> {editor.department}</p>
            <p className="editor-detail"><strong>College:</strong> {editor.college}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default EditorialBoard;
