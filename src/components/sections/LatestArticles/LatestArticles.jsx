import React from "react";
import "./LatestArticles.css";

const articles = [
  {
    title: "Comparative evaluation on the masking ability of different tooth colored restoration...",
    authors: "Prajyal Mahajan, Anupama Nayak P, Charisma Thimmaiah",
    date: "17 Mar 2025",
    image: "src/assets/paper_logo.jpg", // Replace with actual image URL
  },
  {
    title: "Do CAD-CAM fibre posts exhibit higher bond strength and fracture resistance...",
    authors: "Mohammed Maher Ghanem, Xin Yi Leong, Rohit Kunnath Menon",
    date: "17 Mar 2025",
    image: "src/assets/paper_logo.jpg", // Replace with actual image URL
  },
  {
    title: "Drug-associated gingival disorders: a retrospective pharmacovigilance assessment...",
    authors: "Kannan Sridharan & Gowri Swaramakrishnan",
    date: "11 Mar 2025",
    image: "src/assets/paper_logo.jpg", // Replace with actual image URL
  },
  {
    title: "In vitro evaluation of human enamel remineralization after treatment...",
    authors: "Ghada Ahmed Elzayat, Fagr Hassan Elmergawy & Aya Abd Elfattah...",
    date: "03 Mar 2025",
    image: "src/assets/paper_logo.jpg", // Replace with actual image URL
  },
];

const LatestArticles = () => {
  return (
    <div className="featured-articles">
      <h2 className="featured-title">Latest Articles</h2>
      <div className="articles-list">
        {articles.map((article, index) => (
          <div key={index} className="article-item">
            <div className="article-content">
              <p className="article-meta"><strong>Article</strong> <br /> Open Access  <br />{article.date}</p>
              <div className="article-info-section">
                <h3 className="article-title">{article.title}</h3>
                <p className="article-authors">{article.authors}</p>
              </div>
            </div>
            <div className="article-image">
              <img src={article.image} alt="Article Preview" />
            </div>
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default LatestArticles;
