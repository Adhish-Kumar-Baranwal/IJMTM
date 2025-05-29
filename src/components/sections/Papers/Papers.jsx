import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Papers.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../../Footer/Footer";
const Papers = () => {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://t4hxj7p8-5000.inc1.devtunnels.ms/api/research-paper/paper/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPaper({
          type: data?.documentType || "Unknown",
          datePublished: data?.submissionDate
            ? new Date(data.submissionDate).toLocaleDateString()
            : "Unknown",
          title: data?.title || "Untitled",
          authors: data?.authors || [],
          domain: data?.domain || "N/A",
          volumeIssue: "N/A", // still a placeholder
          citeArticleLink: "#",
          doi: "N/A",
          buttons: {
            downloadPdf: data?.pdfFileId
              ? `https://t4hxj7p8-5000.inc1.devtunnels.ms/api/papers/${data.pdfFileId}`
              : "#",
            share: "#",
            cite: "#",
            contactAuthor: `mailto:${data?.authors?.[0]?.email || "author@example.com"}`,
          },
          keywords: data?.keywords ? data.keywords.split(",") : ["N/A"],
          abstract: data?.abstract || "No abstract available.",
        });
      })
      .catch((err) => {
        console.error("Error fetching paper:", err);
        setPaper({
          type: "Unknown",
          datePublished: "Unknown",
          title: "Failed to load paper",
          authors: [],
          domain: "N/A",
          volumeIssue: "N/A",
          citeArticleLink: "#",
          doi: "N/A",
          buttons: {
            downloadPdf: "#",
            share: "#",
            cite: "#",
            contactAuthor: "mailto:author@example.com",
          },
          keywords: ["N/A"],
          abstract: "An error occurred while fetching the paper.",
        });
      });
  }, [id]);

  if (!paper) return <div className="loading">Loading paper...</div>;

  return (
    <>
    <NavBar />
    <button onClick={() => navigate(-1)} className="back-btn">← Back to Articles</button>
    <div className="paper-page">
      <main className="paper-main full-width">
        <p>
          {paper.type} | {paper.datePublished}
        </p>
        <h1>{paper.title}</h1>
        <p className="authors">
          {paper.authors.length > 0
            ? paper.authors.map((author) => author?.name || "Unknown").join(", ")
            : "No authors listed"}
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
      
    </div>
    <Footer />
    </>
  );
};

export default Papers;


