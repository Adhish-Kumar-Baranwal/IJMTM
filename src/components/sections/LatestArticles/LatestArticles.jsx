import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LatestArticles.css";

const LatestArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://t4hxj7p8-5000.inc1.devtunnels.ms/api/submission/published"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Extract the submissions array from the response
        const submissions = result.submissions || [];

        // Transform the data
        const formattedArticles = submissions.map((article) => ({
          id: article._id,
          title: article.title || "Untitled",
          authors: article.authors
            ? article.authors.map((a) => a.name).join(", ")
            : "Anonymous",
          date: article.submissionDate
            ? new Date(article.submissionDate).toLocaleDateString()
            : "Date not available",
          image: "/default-article-image.jpg",
          domain: article.domain || "General",
          abstract: article.abstract || "",
          documentType: article.documentType || "Article",
          pdfFileId: article?.pdfFileId,
        }));
        console.log("Formatted Articles:", formattedArticles);
        setArticles(formattedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  //  const handleArticleClick = (pdfId) => {

  //     window.open(
  //       `https://t4hxj7p8-5000.inc1.devtunnels.ms/api/papers/${pdfId.pdfFileId}`,
  //       '_blank',
  //       'noopener,noreferrer'
  //     );
  //   };
  const handleArticleClick = (article) => {
    navigate(`/paper/${article.id}`);
  };

  if (loading) {
    return <div className="u-container">Loading articles...</div>;
  }

  if (error) {
    return <div className="u-container">Error loading articles: {error}</div>;
  }

  if (articles.length === 0) {
    return <div className="u-container">No articles found</div>;
  }

  return (
    <div className="u-container">
      <div className="latest-articles-section">
        <h2 className="latest-articles-title">Latest Articles</h2>
        <div className="latest-articles-list">
          {articles.map((article, index) => (
            <div
              key={index}
              className="latest-article-item"
              style={{ cursor: "pointer" }}
              onClick={() => handleArticleClick(article)}
            >
              <div className="latest-article-content">
                <div className="latest-article-info">
                  <h3
                    className="latest-article-title"
                    onClick={() => handleArticleClick(article)}
                    style={{ cursor: "pointer" }}
                  >
                    {index + 1}. {article.title}
                  </h3>
                  <p className="latest-article-authors">{article.authors}</p>
                </div>
              </div>
              <p className="latest-article-meta">
                <strong>{article.documentType}</strong>
                <br />
                {article.domain}
                <br />
                {article.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestArticles;
