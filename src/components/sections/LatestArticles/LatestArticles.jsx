import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LatestArticles.css";

const LatestArticles = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/Jsonfolder/LatestArticle.json")
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Error loading articles:", error));
  }, []);

  const handleArticleClick = (id) => {
    navigate(`/article/${id}`);
  };

  return (
    <div className="latest-articles-section">
      <h2 className="latest-articles-title">Latest Articles</h2>
      <div className="latest-articles-list">
        {articles.map((article, index) => (
          <div key={index} className="latest-article-item">
            <div className="latest-article-content">
              <p className="latest-article-meta">
                <strong>Article</strong>
                <br />
                Open Access
                <br />
                {article.date}
              </p>
              <div className="latest-article-info">
                <h3
                  className="latest-article-title"
                  onClick={() => handleArticleClick(article.id)}
                >
                  {article.title}
                </h3>
                <p className="latest-article-authors">{article.authors}</p>
              </div>
            </div>
            <div className="latest-article-image">
              <img src={article.image} alt="Article Preview" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestArticles;
