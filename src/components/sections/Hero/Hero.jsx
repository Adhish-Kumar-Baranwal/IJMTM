import React from "react";
import { Link } from "react-router-dom";
import HeroImg from "../../../assets/waves-white.svg";
import "./Hero.css"

const bgImage = {
  backgroundImage: `url(${HeroImg})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "Bottom",
  backgroundSize: "cover",
  position: "relative",
};

const Hero = () => {
  return (
    <section
      className="hero-section"
      style={bgImage}
    >
      <div className="hero-container space-y-6">
        <h1 className="hero-title md:text-6xl">
          International Journal of Modern <br /> Technology and Management
        </h1>


        <div className="hero-btn-section">
          <Link
            to="/paper-submit"
            className="hero-ppr-submit-btn"
          >
            Submit Paper <span>→</span>
          </Link>
          <Link
            to="/journal-information"
            className="hero-journal-info-btn"
          >
            Journal Information
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
