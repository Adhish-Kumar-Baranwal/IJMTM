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
        const submissions = result.submissions || [];

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

        setArticles(formattedArticles);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleArticleClick = (article) => {
    navigate(`/paper/${article.id}`);
  };

  const handleSeeMoreClick = () => {
    navigate("/published-papers");
  };

  if (loading) return <div className="u-container">Loading articles...</div>;
  if (error) return <div className="u-container">Error: {error}</div>;
  if (articles.length === 0) return <div className="u-container">No articles found.</div>;

  return (
    <div className="u-container">
      <div className="latest-articles-section">
        <h2 className="latest-articles-title">Latest Articles</h2>
        <div className="latest-articles-list">
          {articles.slice(0, 5).map((article, index) => (
            <div
              key={index}
              className="latest-article-item"
              style={{ cursor: "pointer" }}
              onClick={() => handleArticleClick(article)}
            >
              <div className="latest-article-content">
                <div className="latest-article-info">
                  <h3 className="latest-article-title">
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

        {articles.length > 5 && (
          <div style={{ textAlign: "left", marginTop: "1rem" }}>
            <button className="see-more-button" onClick={handleSeeMoreClick}>
              See More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestArticles;
