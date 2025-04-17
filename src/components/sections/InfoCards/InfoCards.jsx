import React, { useEffect, useState } from "react";
import "./InfoCards.css";
import { FaFileAlt, FaBook, FaUsers } from "react-icons/fa";

const iconMap = {
  publication: <FaFileAlt />,
  volume: <FaBook />,
  team: <FaUsers />,
};

const InfoCards = () => {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    fetch("/Jsonfolder/InfoCards.json")
      .then((res) => res.json())
      .then((data) => setCardsData(data))
      .catch((err) => console.error("Failed to load InfoCards data:", err));
  }, []);

  return (
    <div className="u-container info-cards-container">
      {cardsData.map((card, index) => (
        <div className="info-card" key={index}>
          <div className="info-card-header">
            <span className="icon">{iconMap[card.icon]}</span>
            <h3 className="title">{card.title}</h3>
          </div>
          <p className="subtitle">{card.subtitle}</p>
          <div className="content">
  <ul>
    {card.content.map((line, idx) => (
      <li key={idx}>{line}</li>
    ))}
  </ul>
</div>

          <div className="buttons">
            {card.buttons.map((btn, idx) => (
              <a href={btn.link} className="btn" key={idx}>
                {btn.text}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoCards;
