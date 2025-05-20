import React, { useEffect, useState } from "react";
import "./BrowseVolumes.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/sections/NavBar/NavBar";

const BrowseVolumes = () => {
  const [volumes, setVolumes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/Jsonfolder/VolumesData.json")
      .then((res) => res.json())
      .then((data) => setVolumes(data))
      .catch((err) => console.error("Error loading volumes data", err));
  }, []);

  const handleCardClick = (volumeId) => {
    navigate(`/volume/${volumeId}`);
  };

  return (
    <>
      <NavBar />

      <div className="browse-volumes-container">
        <h2 className="browse-volumes-title">Browse Volumes</h2>
        <div className="volumes-grid">
          {volumes.map((volume) => (
            <div
              key={volume.id}
              className="volume-card"
              onClick={() => handleCardClick(volume.id)}
            >
              <img
                src={volume.image}
                alt={volume.title}
                className="volume-card-img"
              />
              <h3 className="volume-card-title">{volume.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BrowseVolumes;
