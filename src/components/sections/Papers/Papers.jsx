import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Papers.css";

const Papers = () => {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(
      `https://t4hxj7p8-5000.inc1.devtunnels.ms/api/research-paper/paper/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPaper({
          type: data.documentType,
          datePublished: new Date(data.submissionDate).toLocaleDateString(),
          title: data.title,
          authors: data.authors,
          domain: data.domain,
          volumeIssue: "N/A", // Placeholder, unless you store this
          citeArticleLink: "#", // Placeholder
          doi: "N/A", // Placeholder
          buttons: {
            downloadPdf: `https://t4hxj7p8-5000.inc1.devtunnels.ms/api/papers/${data.pdfFileId}`, // Adjust as needed
            share: "#",
            cite: "#",
            contactAuthor: `mailto:${
              data.authors[0]?.email || "author@example.com"
            }`,
          },
          keywords: data.keywords.split(","),
          abstract: data.abstract,
        });
      })
      .catch((err) => console.error("Error fetching paper:", err));
  }, [id]);

  if (!paper) return <div className="loading">Loading paper...</div>;

  return (
    <div className="paper-page">
      <main className="paper-main full-width">
        <p>
          {paper.type} | {paper.datePublished}
        </p>
        <h1>{paper.title}</h1>
        <p className="authors">
          {paper.authors.map((author) => author.name).join(", ")}
        </p>

        <div className="meta">
          <p>
            <strong>Domain:</strong> {paper.domain}
          </p>
          <p>
            <strong>Volume/Issue:</strong> {paper.volumeIssue}
          </p>
          <p>
            <strong>DOI:</strong>{" "}
            <a href={paper.citeArticleLink} target="_blank" rel="noreferrer">
              {paper.doi}
            </a>
          </p>
        </div>

        <div className="action-buttons">
          <a href={paper.buttons.downloadPdf} target="_blank" rel="noreferrer">
            Download PDF
          </a>
          <a href={paper.buttons.share} target="_blank" rel="noreferrer">
            Share
          </a>
          <a href={paper.buttons.cite} target="_blank" rel="noreferrer">
            Cite
          </a>
          <a href={paper.buttons.contactAuthor}>Contact Author</a>
        </div>

        <section className="keywords">
          <h3>
            <strong>Keywords:</strong> {paper.keywords.join(", ")}
          </h3>
        </section>

        <section className="abstract">
          <h2>Abstract</h2>
          <p>{paper.abstract}</p>
        </section>
      </main>
      <button onClick={() => navigate(-1)}>← Back to Articles</button>
    </div>
  );
};

export default Papers;
