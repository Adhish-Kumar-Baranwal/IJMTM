  import React, { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import Select from "react-select";
  import "./PublishedPapers.css";

  const PublishedPapers = () => {
    // const [papers, setPapers] = useState([]);
    const [filteredPapers, setFilteredPapers] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedYears, setSelectedYears] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");  
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const navigate = useNavigate();

    useEffect(() => {
      fetch("/Jsonfolder/Paper.json")
        .then((res) => res.json())
        .then((data) => {
          setArticles(data);
          setFilteredPapers(data);
        })
        .catch((err) => console.error("Error loading papers:", err));
    }, []);

    // Extract unique years and subjects
    const yearOptions = [
      ...new Set(articles.map((paper) => paper.year)),
    ].map((year) => ({ value: year, label: year }));


    const subjectOptions = [
      ...new Set(articles.map((paper) => paper.domain)),
    ].map((subject) => ({ value: subject, label: subject }));

    // Filter logic
    useEffect(() => {
      let filtered = [...articles];

      if (searchTerm) {
        filtered = filtered.filter((paper) =>
          paper.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedYears.length > 0) {
        const selectedYearValues = selectedYears.map((opt) => opt.value);
        filtered = filtered.filter((paper) =>
          selectedYearValues.includes(paper.year)
        );
      }


      if (selectedSubjects.length > 0) {
        const selectedSubjectValues = selectedSubjects.map((opt) => opt.value);
        filtered = filtered.filter((paper) =>
          selectedSubjectValues.includes(paper.domain)
        );
      }

      setFilteredPapers(filtered);
    }, [searchTerm, selectedSubjects, selectedYears, articles]);

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
          const formattedArticles = submissions.map((article) => {
            const dateObj = new Date(article.submissionDate);
            const isoDate = dateObj.toISOString().split("T")[0]; // "YYYY-MM-DD"
            const year = dateObj.getFullYear();

            return {
              id: article._id,
              title: article.title || "Untitled",
              authors: article.authors
                ? article.authors.map((a) => a.name).join(", ")
                : "Anonymous",
              date: isoDate,
              year: String(year), // Add year as a separate field
              image: "/default-article-image.jpg",
              domain: article.domain || "General",
              abstract: article.abstract || "",
              documentType: article.documentType || "Article",
              pdfFileId: article?.pdfFileId,
            };
          });
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
      <>
        <div className="u-container">
          <h2 className="cfp-title">Published Papers</h2>
        </div>

        <div className="u-container">
          <div className="filter-container">
            <div className="cfp-search-section">
              <label>Search for research articles</label>
              <input
                type="text"
                className="cfp-search-box"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="cfp-select-section">
              <label>Select Year Published:</label>
              <Select
                isMulti
                options={yearOptions}
                value={selectedYears}
                onChange={setSelectedYears}
              />
            </div>

            <div className="cfp-select-section">
              <label>Select Subject:</label>
              <Select
                isMulti
                options={subjectOptions}
                value={selectedSubjects}
                onChange={setSelectedSubjects}
              />
            </div>
          </div>
        </div>

        <div className="u-container">
          {/* {filteredPapers.length === 0 ? (
            <p>No matching papers found.</p>
          ) : (
            filteredPapers.map((paper) => (
              <div className="paper-section" key={paper.id}>
                <div className="side-card">
                  <p>{paper.type}</p>
                  <p>{paper.datePublished}</p>
                </div>

                <div
                  className="main-card"
                  onClick={() => navigate(`/paper/${paper.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <p><strong>{paper.title}</strong></p>
                  <p>{paper.abstract.slice(0, 150)}...</p>
                </div>
              </div>
            ))
          )} */}
          {filteredPapers.map((article, index) => (
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
      </>
    );
  };

  export default PublishedPapers;
