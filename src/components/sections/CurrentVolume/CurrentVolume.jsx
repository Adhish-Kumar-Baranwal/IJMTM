import React, { useEffect, useState } from "react";
import "./CurrentVolume.css";
import NavBar from "../../NavBar/NavBar";

const CurrentVolume = () => {
  const [volume, setVolume] = useState(null);

  useEffect(() => {
    fetch("/Jsonfolder/CurrentVolume.json")
      .then((res) => res.json())
      .then((data) => setVolume(data))
      .catch((err) => console.error("Failed to load current volume data:", err));
  }, []);

  if (!volume) return <p>Loading...</p>;

  return (
   
    <> 
     <NavBar/>
    <div className="current-volume-container">
      <div className="volume-header">
        <h2>{volume.volumeNumber} {volume.issueNumber}, {volume.date}</h2>
      </div>

      <div className="volume-content">
        <div className="cover-section">
          <img
            src={volume.coverImage}
            alt="Volume Cover"
            className="volume-cover"
          />
          <button className="subscribe-btn">Subscribe</button>
        </div>

        <div className="info-section">
          <h3 className="volume-title">{volume.title}</h3>
          <p className="volume-description">{volume.description}</p>
          <p className="volume-credit">{volume.coverCredit}</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default CurrentVolume;
