import React from "react";
import { Link } from "react-router-dom";
import HeroImg from "../../assets/waves-white.svg";

const bgImage = {
  backgroundImage: `url(${HeroImg})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "Bottom",
  backgroundSize: "cover",
  position: "relative",
};

const Hero = () => {
  return (
    <section className="min-h-[700px] flex justify-center items-center" style={bgImage}>
      <div className="container relative z-20 text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold">
          International Journal of Modern <br /> Technology and Management
        </h1>

        {/* Buttons Section */}
        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/paper-submit"
            className="px-6 py-2 rounded-md bg-white text-black font-medium border border-black flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            Submit Paper <span>→</span>
          </Link>
          <Link
            to="/journal-information"
            className="px-6 py-2 rounded-md bg-black text-white font-medium border border-black hover:bg-gray-900 transition"
          >
            Journal Information
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
