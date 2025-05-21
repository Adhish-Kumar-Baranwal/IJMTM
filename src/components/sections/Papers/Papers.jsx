import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Papers.css";

const Papers = () => {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);

  useEffect(() => {
    fetch("/Jsonfolder/Paper.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id.toString() === id);
        setPaper(found);
      })
      .catch((err) => console.error("Error fetching paper:", err));
  }, [id]);

  if (!paper) return <div className="loading">Loading paper...</div>;

  return (
  <div className="paper-page">
    <main className="paper-main full-width">
      <p>{paper.type} | {paper.datePublished}</p>
      <h1>{paper.title}</h1>
      <p className="authors">{paper.authors.join(", ")}</p>

      <div className="meta">
        <p><strong>Domain:</strong> {paper.domain}</p>
        <p><strong>Volume/Issue:</strong> {paper.volumeIssue}</p>
        <p>
          <strong>DOI:</strong>{" "}
          <a href={paper.citeArticleLink} target="_blank" rel="noreferrer">
            {paper.doi}
          </a>
        </p>
      </div>

      <div className="action-buttons">
        <a href={paper.buttons.downloadPdf} target="_blank" rel="noreferrer">Download PDF</a>
        <a href={paper.buttons.share} target="_blank" rel="noreferrer">Share</a>
        <a href={paper.buttons.cite} target="_blank" rel="noreferrer">Cite</a>
        <a href={paper.buttons.contactAuthor}>Contact Author</a>
      </div>

      <section className="keywords">
        <h3><strong>Keywords:</strong> {paper.keywords.join(", ")}</h3>
      </section>

      <section className="abstract">
        <h2>Abstract</h2>
        <p>{paper.abstract}</p>
      </section>
    </main>
  </div>
);
};

export default Papers;
