import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import HeroImg from "../../assets/waves-white.svg"

const bgImage = {
  backgroundImage: `url(${HeroImg})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "Bottom",
  backgroundSize: "cover",
  position: "relative",
}

const Hero = () => {
  return (
    <section className="min-h-[700px] flex justify-center items-center" style={bgImage}>
      <div className="container relative z-20 text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold">
          International Journal of Modern <br /> Technology and Management
        </h1>
        <p className="text-lg">International Peer Reviewed & Refereed Journal <br /> Open Access To Our Whole Library </p>
        <div className="mt-6 flex justify-center">
          {/* <SearchBar /> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
